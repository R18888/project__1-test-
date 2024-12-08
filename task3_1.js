// Шаг 1: Создаем словарь
const people = {
    "Alice": 30,
    "Bob": 25,
    "Charlie": 35,
    "Diana": 28
};

// Шаг 1: Выводим значение каждого человека несколькими способами
console.log("Шаг 1: Значения каждого человека:");
console.log(people["Alice"]); // Вывод по ключу
console.log(people.Bob);      // Вывод через точечный доступ
for (const key in people) {
    console.log(`${key}: ${people[key]}`); // Перебор ключей с выводом
}
console.log("\n"); // Пустая строка для разделения

// Шаг 2: Добавляем новую пару "ключ-значение"
people["Eve"] = 22; // Добавляем человека Eve с возрастом 22
console.log("Шаг 2: Добавлена пара 'Eve': 22");
console.log(people);
console.log("\n");

// Шаг 3: Изменяем значение одного из существующих ключей
people["Bob"] = 26; // Меняем возраст Bob на 26
console.log("Шаг 3: Изменен возраст Bob на 26");
console.log(people);
console.log("\n");

// Шаг 4: Удаляем одного человека из словаря
delete people["Charlie"]; // Удаляем Charlie из словаря
console.log("Шаг 4: Удалён человек Charlie");
console.log(people);
console.log("\n");

// Шаг 5: Проверяем наличие ключа и выводим результат
const keyToCheck = "Diana";
console.log(`Шаг 5: Ключ "${keyToCheck}" ${keyToCheck in people ? "существует" : "не существует"} в словаре.`);
console.log("\n");

// Шаг 6: Перебираем все ключи словаря и выводим их в консоль
console.log("Шаг 6: Ключи словаря:");
for (const key in people) {
    console.log(key);
}
console.log("\n");

// Шаг 7: Перебираем все значения словаря и выводим их в консоль
console.log("Шаг 7: Значения словаря:");
for (const value of Object.values(people)) {
    console.log(value);
}
console.log("\n");

// Шаг 8: Функция, возвращающая количество пар "ключ-значение"
function countKeyValuePairs(obj) {
    return Object.keys(obj).length; // Возвращаем количество ключей в объекте
}
console.log(`Шаг 8: Количество пар "ключ-значение": ${countKeyValuePairs(people)}`);
console.log("\n");

// Шаг 9: Копируем словарь в новую переменную
const peopleCopy = { ...people }; // Копируем с использованием оператора расширения
peopleCopy["Alice"] = 31; // Изменяем значение в копии
console.log("Шаг 9: Копия словаря:");
console.log("Оригинальный словарь:", people);
console.log("Копия словаря:", peopleCopy);
console.log("\n");

// Шаг 10: Создаем второй словарь
const morePeople = {
    "Frank": 40,
    "Grace": 29
};
console.log("Шаг 10: Создан второй словарь:");
console.log(morePeople);
console.log("\n");

// Шаг 11: Объединяем оба словаря в один
const combinedPeople = { ...people, ...morePeople }; // Объединяем с использованием оператора расширения
console.log("Шаг 11: Объединённый словарь:");
console.log(combinedPeople);
console.log("\n");

// Шаг 12: Преобразуем словарь в массив пар "ключ-значение"
const entriesArray = Object.entries(people); // Преобразуем в массив пар
console.log("Шаг 12: Массив пар 'ключ-значение':");
console.log(entriesArray);
