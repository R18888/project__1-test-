function processNumber(D, R, S) {
    // Преобразуем число D в массив цифр. Сначала число превращаем в строку, затем разбиваем на символы и преобразуем каждый символ в число
    const digits = D.toString().split('').map(Number);

    // Определяем максимальную и минимальную цифры числа D с использованием Math.max и Math.min
    const maxDigit = Math.max(...digits);
    const minDigit = Math.min(...digits);

    // Логика проверки условий и выполнения операций над цифрами:
    if (maxDigit % R === 0 && minDigit % S === 0) {
        // Если максимальная цифра кратна R и минимальная цифра кратна S, увеличиваем все цифры на 5
        for (let i = 0; i < digits.length; i++) {
            digits[i] = (digits[i] + 5) % 10;  // Увеличиваем каждую цифру на 5 и берем по модулю 10
        }
    } else if (maxDigit % R === 0 && minDigit % S !== 0) {
        // Если максимальная цифра кратна R, но минимальная не кратна S, уменьшаем все цифры на 3
        for (let i = 0; i < digits.length; i++) {
            digits[i] = (digits[i] - 3 + 10) % 10;  // Уменьшаем каждую цифру на 3 и берем по модулю 10
        }
    } else if (maxDigit % R !== 0 && minDigit % S === 0) {
        // Если максимальная цифра не кратна R, но минимальная кратна S, удваиваем все цифры
        for (let i = 0; i < digits.length; i++) {
            digits[i] = (digits[i] * 2) % 10;  // Умножаем каждую цифру на 2 и берем по модулю 10
        }
    } else {
        // Если ни максимальная, ни минимальная цифра не кратны R и S, уменьшаем все цифры на 2
        for (let i = 0; i < digits.length; i++) {
            digits[i] = (digits[i] - 2 + 10) % 10;  // Уменьшаем каждую цифру на 2 и берем по модулю 10
        }
    }

    // Преобразуем массив цифр обратно в строку, затем выводим результат как новое число
    const newNumber = digits.join('');  // Превращаем массив цифр в строку
    console.log(`Новое число: ${newNumber}`);  // Выводим новое число в консоль
}

// Пример использования функции с конкретными значениями D, R, и S
const D = 998;  // Пятизначное число
const R = 3;      // Однозначное число R
const S = 2;      // Однозначное число S

processNumber(D, R, S);  // Вызываем функцию с заданными параметрами
