// Создаем словарь с именами и баллами студентов
const students = {
    'Алексей': 85,  // Имя студента и его баллы
    'Мария': 92,
    'Иван': 78,
    'Ольга': 90,
    'Дмитрий': 66
};

// Функция для фильтрации студентов по пороговому значению
function filterStudentsByScore(students, threshold) {
    const filteredStudents = {};  // Создаем пустой объект для хранения отфильтрованных студентов
    
    // Проходим по каждому элементу словаря студентов
    for (const [name, score] of Object.entries(students)) {
        // Проверяем, если балл студента выше порогового значения
        if (score > threshold) {
            filteredStudents[name] = score;  // Добавляем студента в новый объект
        }
    }
    
    return filteredStudents;  // Возвращаем отфильтрованный объект студентов
}

// Пример использования функции
const threshold = 91;  // Устанавливаем пороговое значение
const filtered = filterStudentsByScore(students, threshold);  // Получаем отфильтрованных студентов
console.log(filtered);  // Выводим результат в консоль: { Алексей: 85, Мария: 92, Ольга: 90 }
