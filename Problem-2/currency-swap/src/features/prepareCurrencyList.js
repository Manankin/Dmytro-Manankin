export default function prepareCurrencyList(list, text) {
  const trimText = text.trim().toLowerCase();

  const result = list.filter(elem => elem.currency.toLowerCase().includes(trimText))

  return result;
}

