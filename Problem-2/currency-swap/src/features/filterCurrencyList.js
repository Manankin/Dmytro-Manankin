export default function filterCurrencyList(list) {
  const curencyNames = [];
  const result = [];

  for (let i = 0; i < list.length; i++) {
    if (!curencyNames.includes(list[i].currency)) {
      result.push(list[i]);
      curencyNames.push(list[i].currency)
    }
  }

  return result;
}