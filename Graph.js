const fs = require('fs'); // Подключение модуля 'fs' для работы с файловой системой (чтение и запись файлов)

class Graph {
  constructor(directed = false, weighted = false) {
    // Конструктор класса Graph. Параметры:
    // directed - указывает, ориентированный ли граф (по умолчанию false)
    // weighted - указывает, взвешенный ли граф (по умолчанию false)
    this.adjacencyList = {}; // Словарь для хранения списка смежности графа
    this.directed = directed; // Флаг для ориентированности графа
    this.weighted = weighted; // Флаг для взвешенности графа
  }

  // Статический метод для создания пустого графа
  static emptyGraph(directed = false, weighted = false) {
    return new Graph(directed, weighted); // Возвращаем новый экземпляр графа с заданными параметрами
  }

  // Статический метод для создания графа из файла
  static fromFile(filePath, directed = false, weighted = false) {
    const fileContent = fs.readFileSync(filePath, 'utf-8'); // Чтение содержимого файла
    const graph = new Graph(directed, weighted); // Создание нового графа
    const lines = fileContent.trim().split('\n'); // Разбиение содержимого на строки

    // Обрабатываем каждую строку из файла
    for (let line of lines) {
      const [from, to, weight] = line.split(',').map(x => x.trim()); // Разбиение строки по запятой и удаление пробелов
      graph.addEdge(from, to, weighted ? parseFloat(weight) : undefined); // Добавляем ребро в граф
    }

    return graph; // Возвращаем созданный граф
  }

  // Метод для добавления вершины в граф
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []; // Если вершина еще не существует, создаем для нее пустой список смежности
    } else {
      console.error(`Вершина "${vertex}" уже существует.`); // Если вершина уже существует, выводим ошибку
    }
  }

  // Метод для добавления ребра (или дуги)
  addEdge(from, to, weight = 1) {
    if (!this.adjacencyList[from]) this.addVertex(from); // Если вершина "from" не существует, добавляем ее
    if (!this.adjacencyList[to]) this.addVertex(to); // Если вершина "to" не существует, добавляем ее

    const edge = this.weighted ? { vertex: to, weight } : { vertex: to }; // Создаем ребро с весом или без
    this.adjacencyList[from].push(edge); // Добавляем ребро в список смежности для вершины "from"

    if (!this.directed) {
      const reverseEdge = this.weighted ? { vertex: from, weight } : { vertex: from }; // Если граф не ориентированный, добавляем обратное ребро
      this.adjacencyList[to].push(reverseEdge); // Добавляем обратное ребро для вершины "to"
    }
  }

  // Метод для удаления вершины из графа
  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      delete this.adjacencyList[vertex]; // Удаляем вершину из списка смежности

      // Проходим по всем вершинам графа и удаляем все рёбра, ведущие к удаляемой вершине
      for (let key in this.adjacencyList) {
        this.adjacencyList[key] = this.adjacencyList[key].filter(
          edge => edge.vertex !== vertex // Убираем рёбра, содержащие ссылку на удаленную вершину
        );
      }
    } else {
      console.error(`Вершины "${vertex}" не существует.`); // Выводим ошибку, если вершины нет в графе
    }
  }

  // Метод для удаления ребра (или дуги) между вершинами
  removeEdge(from, to) {
    if (this.adjacencyList[from]) {
      this.adjacencyList[from] = this.adjacencyList[from].filter(
        edge => edge.vertex !== to // Удаляем рёбра, ведущие в вершину "to"
      );
    }
    if (!this.directed && this.adjacencyList[to]) {
      this.adjacencyList[to] = this.adjacencyList[to].filter(
        edge => edge.vertex !== from // Если граф не ориентированный, удаляем рёбра в обратную сторону
      );
    }
  }

  // Метод для получения всех рёбер графа
  getEdges() {
    const edges = [];
    for (let vertex in this.adjacencyList) {
      for (let edge of this.adjacencyList[vertex]) {
        if (this.directed || vertex < edge.vertex) {
          // Если граф ориентированный или это не обратное ребро, добавляем его в список
          edges.push(this.weighted ? [vertex, edge.vertex, edge.weight] : [vertex, edge.vertex]);
        }
      }
    }
    return edges; // Возвращаем список рёбер
  }

  // Метод для экспорта графа в файл
  exportToFile(filePath) {
    let result = '';
    for (let vertex in this.adjacencyList) {
      for (let edge of this.adjacencyList[vertex]) {
        result += this.weighted
          ? `${vertex}, ${edge.vertex}, ${edge.weight}\n` // Если граф взвешенный, добавляем вес
          : `${vertex}, ${edge.vertex}\n`; // Если не взвешенный, просто указываем вершины
      }
    }
    fs.writeFileSync(filePath, result.trim()); // Записываем результат в файл
    console.log(`Граф экспортирован в файл: ${filePath}`); // Выводим сообщение о том, что граф экспортирован
  }

  // Метод для печати списка смежности
  printAdjacencyList() {
    console.log(this.adjacencyList); // Выводим список смежности в консоль
  }
}

// Минималистичный консольный интерфейс для работы с графом
const graphInterface = () => {
  const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Функция для выбора типа графа (ориентированный/неориентированный и взвешенный/невзвешенный)
  const askType = () => {
    rl.question('Выберите тип графа (0 - неориентированный, 1 - ориентированный): ', directedAnswer => {
      const isDirected = directedAnswer.trim() === '1'; // Определяем, ориентированный ли граф
      rl.question('Граф взвешенный? (0 - нет, 1 - да): ', weightedAnswer => {
        const isWeighted = weightedAnswer.trim() === '1'; // Определяем, взвешенный ли граф
        let graph = Graph.emptyGraph(isDirected, isWeighted); // Создаем граф
        console.log(isDirected ? 'Ориентированный граф создан.' : 'Неориентированный граф создан.');
        console.log(isWeighted ? 'Взвешенный граф создан.' : 'Невзвешенный граф создан.');
        askMenu(graph); // Запускаем меню для дальнейших действий
      });
    });
  };

  // Главное меню интерфейса
  const menu = `
1. Добавить вершину
2. Добавить ребро
3. Удалить вершину
4. Удалить ребро
5. Показать список смежности
6. Экспорт графа в файл
7. Импорт графа из файла
8. Выход
Выберите нужный вариант: `;

  // Функция для обработки выбора пользователя из меню
  // Функция для обработки выбора пользователя из меню
const askMenu = graph => {
  rl.question(menu, answer => {
    switch (answer.trim()) {
      case '1':
        rl.question('Введите вершину: ', vertex => {
          graph.addVertex(vertex.trim()); // Добавляем вершину в граф
          askMenu(graph); // Возвращаемся к меню
        });
        break;
      case '2':
        rl.question(graph.weighted ? 'Введите ребро (Откуда, Куда, Вес): ' : 'Введите ребро (Откуда, Куда): ', input => {
          const [from, to, weight] = input.split(',').map(x => x.trim()); // Разбираем ввод
          graph.addEdge(from, to, graph.weighted ? parseFloat(weight) : undefined); // Добавляем ребро в граф
          askMenu(graph); // Возвращаемся к меню
        });
        break;
      case '3':
        rl.question('Введите вершину для удаления: ', vertex => {
          graph.removeVertex(vertex.trim()); // Удаляем вершину из графа
          askMenu(graph); // Возвращаемся к меню
        });
        break;
      case '4':
        rl.question('Введите ребро для удаления (Откуда, Куда): ', input => {
          const [from, to] = input.split(',').map(x => x.trim()); // Разбираем ввод
          graph.removeEdge(from, to); // Удаляем ребро из графа
          askMenu(graph); // Возвращаемся к меню
        });
        break;
      default:
        console.log('Неверный выбор, попробуйте снова.');
        askMenu(graph); // Возвращаемся к меню
        break;
    } // Закрываем switch
  }); // Закрываем rl.question
  }
};
console.log("Программа запущена");