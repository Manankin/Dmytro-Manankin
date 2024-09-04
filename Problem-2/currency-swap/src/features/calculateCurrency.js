export default function calculateCurrency(input, output, amount) {
  let result = '';
  if (input !== '' && output !== '' && amount !== '') {
    result = amount / input.price * output.price;
  }

  return result
}

