const removeDuplicates = (arr) => {
    const uniqueArray = [...new Set(arr)];
    return uniqueArray;
};

const numbers = [1, 2, 3, 3, 2, 6, 4, 5, 5, 6, 7, 7]; // Исходный массив с дубликатами
const uniqueNumbers = removeDuplicates(numbers);

console.log(uniqueNumbers);
