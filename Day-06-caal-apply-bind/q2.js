function multiply(a, b) {
  return a * b;
}

function multiplyNumbers(num1, num2) {
  return multiply.apply([num1, num2]);
}

let result = multiplyNumbers(5, 3);
console.log(result); 
