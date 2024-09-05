export default function checkList(item, search) {
  return item.currency.toLowerCase().includes(search.trim().toLowerCase())
}