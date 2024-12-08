// Интерфейс ListItem<T> с обобщённым типом T
interface ListItem<T> {
  value: T; // Поле value типа T
}

// Класс List<T>, который хранит массив элементов типа ListItem<T>
class List<T> {
  private items: ListItem<T>[] = []; // Приватное поле для хранения массива элементов

  // Метод для добавления элемента в список
  addItem(item: ListItem<T>): void {
      this.items.push(item); // Добавляем элемент в массив
  }

  // Метод для получения всех элементов списка
  getItems(): ListItem<T>[] {
      return this.items; // Возвращаем весь массив элементов
  }
}

// Пример использования

// Создаём экземпляр List для типа number
const numberLists = new List<number>();

// Добавляем элементы в список
numberLists.addItem({ value: 42 });
numberLists.addItem({ value: 7 });
numberLists.addItem({ value: 100 });

// Получаем все элементы списка
const number = numberLists.getItems();
console.log("Список чисел:", number);

// Создаём экземпляр List для типа string
const stringLists = new List<string>();

// Добавляем элементы в список
stringLists.addItem({ value: "Hello" });
stringLists.addItem({ value: "World" });
stringLists.addItem({ value: "TypeScript" });

// Получаем все элементы списка
const string = stringLists.getItems();
console.log("Список строк:", string);

// Пример вывода:
// Список чисел: [ { value: 42 }, { value: 7 }, { value: 100 } ]
// Список строк: [ { value: 'Hello' }, { value: 'World' }, { value: 'TypeScript' } ]
