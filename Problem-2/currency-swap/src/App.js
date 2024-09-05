import { useEffect, useState } from 'react';
import './App.css';
import { currencyList } from './data';
import filterCurrencyList from './features/filterCurrencyList';
import formatCurrencyList from './features/formatCurrencyList';
import calculateCurrency from './features/calculateCurrency';
import checkList from './checkList';
import checkInputAmount from './features/checkInputAmount';

const listOfCurency = formatCurrencyList(filterCurrencyList(currencyList));
const currencyNames = listOfCurency.map(item => item.currency.toLowerCase());


function App() {
  const [inputField, setInputField] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [outputField, setOutputField] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchOutput, setSearchOutput] = useState('');
  let timeoutId;

  useEffect(() => {
    if (inputField && outputField) {
      if (inputAmount) {
        setOutputAmount(calculateCurrency(inputField, outputField, inputAmount));
      } else if (outputAmount) {
        setInputAmount(calculateCurrency(outputField, inputField, outputAmount));
      }
    }

    if (!inputField) {
      setInputAmount('')
    }

    if (!outputField) {
      setOutputAmount('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputField, outputField])

  const inputHandleBlur = () => {
    if (currencyNames.includes(searchInput.trim().toLowerCase())) {
      setInputField(listOfCurency.find(elem => elem.currency.toLowerCase() === searchInput.trim().toLowerCase()));
    }

    if (searchInput) {
        timeoutId = setTimeout(()=> {
        setSearchInput('')
      }, 150)
    }
  }

  const outputHandleBlur = () => {
    if (currencyNames.includes(searchOutput.trim().toLowerCase())) {
      setOutputField(listOfCurency.find(elem => elem.currency.toLowerCase() === searchOutput.trim().toLowerCase()));
    }

    if (searchOutput) {
      timeoutId = setTimeout(()=> {
      setSearchOutput('')
    }, 150)}
  }

  const inputHandleFocus = () => {
    if (inputField) {
      setSearchInput(inputField.currency);
      setInputField('');
    } else {
      setSearchInput('')
  }}

  const outputHandleFocus = () => {
    if (outputField) {
      setSearchOutput(outputField.currency);
      setOutputField('');
    } else {
      setSearchOutput('')
  }}

  return (
    <div className="App">
      <div className='container'>

      <div className="input-block">
        <h2>Type currency name to exchange or choose it from the list below</h2>
        <div className="inputs">
          <input
            className={listOfCurency.some(item => checkList(item, searchInput)) ? '' : 'error'}
            type="text"
            value={inputField.currency || searchInput || ''}
            placeholder='choose a currency'
            onFocus={inputHandleFocus}
            onBlur={inputHandleBlur}
            onChange={(e) => {
              setSearchInput(e.target.value)
            }}
          />
          {!listOfCurency.some(item => checkList(item, searchInput)) &&
          <span className='warning'>No any matches with currency name... Try smth else</span>
          }
          <input
            type="text"
            placeholdder='enter amount here'
            value={inputAmount}
            className={checkInputAmount(inputAmount) ? 'input-amount' : 'input-amount error'}
            onChange={(e) => {
              setInputAmount(e.target.value.replace(/[^0-9.]/g, ''))
              setOutputAmount(calculateCurrency(inputField, outputField, e.target.value.replace(/[^0-9.]/g, '')))
            }}
          />
        </div>
        <div className="currency-list list">
        { listOfCurency.map(item => (
          <span
            key={item.id}
            className={item.currency.toLowerCase().includes(searchInput.trim().toLowerCase()) ? 'list-item' : 'hidden'}
            onClick={() => {
              clearTimeout(timeoutId);
              setInputField(item)
              setSearchInput('')
            }
          }
          >{item.currency}</span>
        ))}
        </div>
      </div>

      <div className="input-block">
        <h2>Type currency name to exchange or choose it from the list below</h2>
        <div className='inputs'>
          <input
            className={listOfCurency.some(item => checkList(item, searchOutput)) ? '' : 'error'}
            type="text"
            placeholder='choose a currency'
            value={outputField.currency || searchOutput || ''}
            onFocus={outputHandleFocus}
            onBlur={outputHandleBlur}
            onChange={(e) => {
              setSearchOutput(e.target.value)
            }}
          />
          {!listOfCurency.some(item => checkList(item, searchOutput)) &&
          <span className='warning'>No any matches with currency name... Try smth else</span>
          }
          <input
            type="text"
            value={outputAmount}
            className={checkInputAmount(outputAmount) ? 'input-amount' : 'input-amount error'}
            onChange={(e) => {
              setOutputAmount(e.target.value.replace(/[^0-9.]/g, ''))
              setInputAmount(calculateCurrency(outputField, inputField, e.target.value.replace(/[^0-9.]/g, '')))}}
          />
        </div>
        <div className="currency-list list">
        { listOfCurency.map(item => (
          <span
            key={item.id}
            className={item.currency.toLowerCase().includes(searchOutput.trim().toLowerCase()) ? 'list-item' : 'hidden'}
            onClick={() => {
              clearTimeout(timeoutId);
              setOutputField(item)
              setSearchOutput('')
            }}
          >{item.currency}</span>
        ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
