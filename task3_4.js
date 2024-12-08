// Функция для создания словаря, где ключи — строки, а значения — их длина
function getStringLengths(arr) {
    const result = {};  // Создаем пустой объект для хранения результата
    
    // Проходим по каждой строке в массиве
    for (const str of arr) {
        result[str] = str.length;  // Ключ — строка, значение — длина строки
    }
    
    return result;  // Возвращаем получившийся словарь
}

// Пример использования функции
const stringsArray = ['apple', 'banana', 'cherry', 'date'];
const lengthsDictionary = getStringLengths(stringsArray);
console.log(lengthsDictionary);
// Вывод: { apple: 5, banana: 6, cherry: 6, date: 4 }
