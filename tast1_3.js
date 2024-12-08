const getPermutations = (str) => { // Объявление функции для получения всех перестановок строки
    if (str.length <= 1) { // Базовый случай: если длина строки 1 или меньше, возвращаем саму строку в виде массива
        return [str];
    }

    return str.split('').reduce((permutations, char, i) => {
        const remainingString = str.slice(0, i) + str.slice(i + 1); // Формируем оставшуюся часть строки без выбранного символа
        const remainingPermutations = getPermutations(remainingString); // Рекурсивно получаем перестановки оставшейся части строки

        // Объединяем текущий символ с каждой перестановкой и добавляем к результату
        return permutations.concat(remainingPermutations.map(perm => char + perm));
    }, []);
};

const inputString = "abc"; // Задаём исходную строку для поиска перестановок (в данном случае "abc")
const result = getPermutations(inputString); // Вызываем функцию для получения перестановок исходной строки

console.log(result); // Выводим результат в консоль
