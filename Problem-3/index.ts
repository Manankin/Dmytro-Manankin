interface WalletBalance {
  currency: string;
  amount: number;
}
// інтерфейс FormattedWalletBalance є розширенням інтерфейсу WalletBalance, тому було б краще зробити його через extends та додати id

// interface FormattedWalletBalance extends WalletBalance {
//  formatted: string,
//  id: number
// }
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// судячи з назв цих пропсів то Props  мав би бути базовим (але як вже маємо)
// всередині фігурних дужок треба додати якусь властивість або метод, так як базу ми розширюємо
interface Props extends BoxProps {
// додаємо властивість(ті) або метод(и)
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
// масив balances котрий ми отримуємо через кастомний хук це масив елементів з типизацією WalletBalance, і інтерфейс цього типу
// не має властивості blockchain, таким чином функція getPriority в аргумент завжди буде отримувати undefined
// навіщо створили зміну balancePriority якщо вона не приймає участі у фільтрації
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
      // зміна lhsPriority приходить ззовні (тому як тут ми її не створювали) і вважаю щоо її значення валідне 
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
// сортування масиву після фільтрації, маємо туж проблему з властивістю blockchain для зміних типу WalletBalance де
// такої властивості не прописано, таким чином змінні leftPriority та rightPriority мають бути рівними (як результат функціїї
// від однакового аргумента) і сортування не відбудеться (або відбудеться за невідомими критеріями котрі залежать від движка браузера ) тому що при рівних значеннях має повертатися 0, але цього немає
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

// змінна sortedBalances умовно огорнута useMemo і буде мати зміни тільки якщо зміняться balances або prices, але formattedBalances буде
// створюватися при кожному рендері компонента. Я б виконання методу map поставив зразу після сортування всередині useMemo, таким чином
// позбувся би помилки невідповідності типів при створенні rows, так як при створенні rows маємо використовувати масив з типизацією 
// FormattedWalletBalance, а не WalletBalance як маємо зараз
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
      id: new Date() // можливо підключення бібліотеки для створення id
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        //  виористання індексу елемента для атрибута key не є гарною практикою, можна додати в інтерфейс FormattedWalletBalance ще
        // одну властивість id, при мапуванні додати цей id і використати його тут
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}

// я б створив sortedBalances наступним чином (назву трохи змінено)
const sorted_Balances = useMemo(() => {
  return balances.filter((balance: WalletBalance) => {
    if (lhsPriority > -99) {
       if (balance.amount <= 0) {
         return true;
       }
    }
    return false
  }).map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()б
      id: 
    }
  })
}, [balances, prices]);

// і вже sorted_Balances пропускав би через метод map для створення rows
const rows_1 = sortedBalances.map((balance: FormattedWalletBalance) => {
  const usdValue = prices[balance.currency] * balance.amount;
  return (
    <WalletRow
      className={classes.row}
      //  виористання індексу елемента для атрибута key не є гарною практикою, можна додати в інтерфейс FormattedWalletBalance ще
      // одну властивість id, при мапуванні додати цей id і використати його тут
      key={balance.id}
      amount={balance.amount}
      usdValue={usdValue}
      formattedAmount={balance.formatted}
    />
  )
})