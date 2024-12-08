function processNumber(C, M, N) {
  let digits = String(C).split('').map(Number);
  
  // Вычисляем сумму квадратов цифр
  let sumOfSquares = digits.reduce((sum, digit) => sum + digit ** 2, 0);
  
  if (sumOfSquares % M === 0 && sumOfSquares % N === 0) {
    digits = digits.map(digit => digit + 2);
  } else if (sumOfSquares % M === 0 && sumOfSquares % N !== 0) {
    digits = digits.map(digit => digit / 2);
  } else if (sumOfSquares % N === 0 && sumOfSquares % M !== 0) {
    digits = digits.map(digit => (digit + 3) % 10);
  } else {
    digits = digits.map(digit => digit - 4);
  }
  
  // Собираем число и округляем его до целого
  return Math.round(Number(digits.join('')));
}

let C = 999; 
let M = 2; 
let N = 3; 

let result = processNumber(C, M, N);
console.log(result);


