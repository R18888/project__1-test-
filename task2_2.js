const findSecondLargest = (arr) => {
    const uniqueSortedArray = [...new Set(arr)].sort((a, b) => b - a);
    return uniqueSortedArray[1];
};

const numbers = [3, 10, 1, 4, 2, 5, 6, 7, 7]; // Исходный массив
const secondLargest = findSecondLargest(numbers);

console.log(secondLargest);
