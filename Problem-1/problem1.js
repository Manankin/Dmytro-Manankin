'use strict'
// we appologize that n will be really integer and don't check if it's true.
// Hovewer we can add additional checking inside function and throw error if n not integer

function sum_to_n_a(n) {
  return (n + 1) * n / 2;
}

function sum_to_n_b(n) {
  let result = 0;
  for (let i = 1; i <= n; i++) result += i;
  return result;
}

function sum_to_n_c(n) {
  if (n === 1) return 1;
  return n + sum_to_n_c(n-1);
}

// functio return true if n is integer
function isInteger(n) {
  return Number.isInteger(n);
}

const num = 1977;

console.log('====================================');
console.log('variant 1 = ', sum_to_n_a(num));
console.log('variant 2 = ', sum_to_n_b(num));
console.log('variant 3 = ', sum_to_n_c(num));
console.log('====================================');
