// Определяем обобщённый тип функции FilterFunction<T>
type FilterFunction<T> = (item: T) => boolean;

// Реализуем функцию filterArray
function filterArray<T>(array: T[], filterFn: FilterFunction<T>): T[] {
    // Используем метод filter для создания нового массива
    return array.filter(filterFn);
}

// Пример использования

// Пример с числами: оставляем только чётные числа
const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const isEven: FilterFunction<number> = (num) => num % 2 === 0; // Фильтр для чётных чисел

const evenNumbers = filterArray(numberList, isEven);
console.log("Чётные числа:", evenNumbers);

// Пример со строками: оставляем только строки длиннее 3 символов
const stringList = ["apple", "cat", "banana", "dog", "elephant"];
const longerThanThree: FilterFunction<string> = (str) => str.length > 3; // Фильтр для длинных строк

const longStrings = filterArray(stringList, longerThanThree);
console.log("Длинные строки:", longStrings);

// Пример с объектами: фильтруем по свойству
type Product1 = { name: string; price: number };
const productCatalog: Product1[] = [
    { name: "Apple", price: 1.5 },
    { name: "Bread", price: 2.0 },
    { name: "Cheese", price: 3.5 },
    { name: "Banana", price: 0.8 }
];

const isExpensive: FilterFunction<Product1> = (product) => product.price > 2.0; // Фильтр для дорогих продуктов

const expensiveProducts = filterArray(productCatalog, isExpensive);
console.log("Дорогие продукты:", expensiveProducts);
