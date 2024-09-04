export default function formatCurrencyList(list) {
  return list.map((item, index) => {
    return {
      ...item,
      id: index + 1,
    }
  })
}