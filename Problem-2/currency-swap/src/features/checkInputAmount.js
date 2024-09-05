export default function checkInputAmount(text) {
  if (text === '') return true

  return text.toString().indexOf('.') === text.toString().lastIndexOf('.')
}