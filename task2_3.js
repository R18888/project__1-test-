const maximumProductOfThree = (arr) => {
    const sortedArray = [...arr].sort((a, b) => b - a);

    // Находим максимальные три числа
    const max1 = sortedArray[0];
    const max2 = sortedArray[1];
    const max3 = sortedArray[2];

    // Находим минимальные два числа (они могут быть отрицательными) и максимальное число
    const min1 = sortedArray[sortedArray.length - 1];
    const min2 = sortedArray[sortedArray.length - 2];

    // Возвращаем максимальное произведение: либо произведение трёх наибольших чисел, либо произведение двух наименьших (отрицательных) и наибольшего
    return Math.max(max1 * max2 * max3, max1 * min1 * min2);
};

const numbers = [-10, -10, 5, 2, 3, 7]; // Пример массива
const maxProduct = maximumProductOfThree(numbers);

console.log(maxProduct);
