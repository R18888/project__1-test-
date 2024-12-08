function isDecreasingSequence(number) {
    // Проверим, что число трехзначное
    if (number < 100 || number > 999) {
        return "Число должно быть трехзначным";
    }

    // Преобразуем число в строку для удобного доступа к цифрам
    const digits = String(number).split('').map(Number);

    // Проверим, является ли последовательность убывающей
    if (digits[0] > digits[1] && digits[1] > digits[2]) {
        return true;
    } else {
        return false;
    }
}

// Пример использования:
const number = 456;  // Можно заменить на любое другое трехзначное число
if (isDecreasingSequence(number)) {
    console.log("Цифры числа образуют убывающую последовательность");
} else {
    console.log("Цифры числа не образуют убывающую последовательность");
}
