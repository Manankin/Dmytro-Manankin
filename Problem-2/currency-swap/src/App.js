import { useEffect, useState } from 'react';
import './App.css';
import { currencyList } from './data';
import filterCurrencyList from './features/filterCurrencyList';
import formatCurrencyList from './features/formatCurrencyList';
import calculateCurrency from './features/calculateCurrency';
import prepareCurrencyList from './features/prepareCurrencyList';

const listOfCurency = formatCurrencyList(filterCurrencyList(currencyList));

function App() {
  const [inputField, setInputField] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [outputField, setOutputField] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [searchInput, setSearchInput] = useState('')
  const [searchOutput, setSearchOutput] = useState('')

  // useEffect(() => {
  //   setOutputAmount(calculateCurrency(inputField, outputField, inputField))
  // }, [inputField, inputAmount, outputField, outputAmount])

  return (
    <div className="App">
      <div className='container'>

      <div className="input-block">
        <h2>Type currency name to exchange or choose it from the list below</h2>
        <div className="inputs">
          <input
            type="text"
            value={inputField.currency}
            placeholder='choose a currency'
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <input
            type="text"
            placeholdder='enter amount here'
            value={inputAmount}
            className='input-amount'
            onChange={(e) => {
              setInputAmount(+e.target.value)
              setOutputAmount(calculateCurrency(inputField, outputField, e.target.value))
            }}
          />
        </div>
        <div className="currency-list list">
        { prepareCurrencyList(listOfCurency, searchInput).map(item => (
          <span
            key={item.id}
            className="list-item"
            onClick={() => setInputField(item)}
          >{item.currency}</span>
        ))}
        </div>
      </div>
      {/* <div className='switch'>switch currency</div> */}
      <div className="input-block">
        <h2>Type currency name to exchange or choose it from the list below</h2>
        <div className='inputs'>
          <input
            type="text"
            placeholder='choose a currency'
            value={outputField.currency}
            onChange={(e) => setSearchOutput(e.target.value)}
          />
          <input
            type="text"
            value={outputAmount}
            className='input-amount'
            onChange={(e) => {
              setOutputAmount(+e.target.value)
              setInputAmount(calculateCurrency(outputField, inputField, +e.target.value))}}
          />
        </div>
        <div className="currency-list list">
        { prepareCurrencyList(listOfCurency, searchOutput).map(item => (
          <span
            key={item.id}
            className="list-item"
            onClick={() => setOutputField(item)}
          >{item.currency}</span>
        ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
