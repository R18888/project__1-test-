const fs = require('fs'); // Подключение модуля 'fs' для работы с файловой системой (чтение и запись файлов).

class Graph {
  constructor(directed = false, weighted = false) {
    this.adjacencyList = {}; // Словарь для хранения списка смежности графа.
    this.directed = directed; // Флаг определяет, является ли граф ориентированным.
    this.weighted = weighted; // Флаг определяет, является ли граф взвешенным.
  }

  static emptyGraph(directed = false, weighted = false) {
    return new Graph(directed, weighted); // Создаёт новый экземпляр графа с указанными параметрами.
  }

  static fromFile(filePath, directed = false, weighted = false) {
    const fileContent = fs.readFileSync(filePath, 'utf-8'); // Чтение содержимого файла.
    const graph = new Graph(directed, weighted); // Создание нового графа с указанными параметрами.
    const lines = fileContent.trim().split('\n'); // Разделение содержимого файла на строки.

    for (let line of lines) {
      const [from, to, weight] = line.split(',').map(x => x.trim()); // Разделение строки на составляющие.
      graph.addEdge(from, to, weighted ? parseFloat(weight) : undefined); // Добавление ребра в граф.
    }

    return graph; // Возвращаем созданный граф.
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []; // Если вершина не существует, создаём для неё пустой список смежности.
    } else {
      console.error(`Вершина "${vertex}" уже существует.`);
    }
  }


  filterMutualEdges() {
    const newAdjacencyList = {}; // Новый список смежности для фильтрованного графа.
  
    for (const [from, edges] of Object.entries(this.adjacencyList)) {
      newAdjacencyList[from] = []; // Инициализируем пустой список для вершины.
  
      for (const edge of edges) {
        const to = edge.vertex;
        // Проверяем, существует ли обратная дуга в целевой вершине.
        const hasReverseEdge = this.adjacencyList[to]?.some(
          reverseEdge => reverseEdge.vertex === from
        );
  
        if (hasReverseEdge) {
          newAdjacencyList[from].push(edge); // Оставляем дугу, если есть обратная.
        }
      }
    }
  
    this.adjacencyList = newAdjacencyList; // Заменяем список смежности.
    console.log('Граф обновлён: оставлены только взаимные дуги.');
  }

  countEdges() {
    let count = 0;
    for (const vertex in this.adjacencyList) {
      count += this.adjacencyList[vertex].length;
    }
    // Для неориентированного графа делим количество рёбер на 2
    return this.directed ? count : count / 2;
  }

  countVertices() {
    return Object.keys(this.adjacencyList).length;
  }

  countComponents() {
    const visited = new Set();
    let components = 0;

    const bfs = (start) => {
      const queue = [start];
      visited.add(start);

      while (queue.length > 0) {
        const vertex = queue.shift();
        for (const edge of this.adjacencyList[vertex] || []) {
          if (!visited.has(edge.vertex)) {
            visited.add(edge.vertex);
            queue.push(edge.vertex);
          }
        }
      }
    };

    for (const vertex in this.adjacencyList) {
      if (!visited.has(vertex)) {
        components++;
        bfs(vertex);
      }
    }

    return components;
  }

  calculateCyclomaticNumber() {
    const m = this.countEdges(); // Количество рёбер
    const n = this.countVertices(); // Количество вершин
    const c = this.countComponents(); // Количество компонент связности

    return m - n + c; // Цикломатическое число
  }



  isAcyclic() {
    if (!this.directed) {
      console.error('Проверка ацикличности реализована только для ориентированных графов.');
      return false;
    }
  
    const visited = {};  // Статус каждой вершины (0 - не посещена, 1 - в процессе, 2 - посещена)
    
    // Вспомогательная функция для обхода в глубину
    const dfs = (vertex) => {
      if (visited[vertex] === 1) {
        // Если вершина уже в процессе обхода, то нашли цикл
        return true;
      }
      if (visited[vertex] === 2) {
        // Если вершина уже обработана, пропускаем её
        return false;
      }
  
      visited[vertex] = 1;  // Помечаем вершину как в процессе обхода
  
      // Обход всех смежных вершин
      for (const edge of this.adjacencyList[vertex] || []) {
        if (dfs(edge.vertex)) {
          return true;  // Если найден цикл, возвращаем true
        }
      }
  
      visited[vertex] = 2;  // Помечаем вершину как посещённую
      return false;
    };
  
    // Проверяем все вершины, так как граф может быть не связным
    for (const vertex in this.adjacencyList) {
      if (visited[vertex] === undefined) {
        // Если вершина ещё не была посещена
        if (dfs(vertex)) {
          return false;  // Если цикл найден, граф не ацикличен
        }
      }
    }
  
    return true;  // Если цикл не найден, граф ацикличен
  }
  
  



  findVertexWithEdgeFromUButNotV(u, v) {
    if (!Object.keys(this.adjacencyList).length) {
      console.log('Граф пуст.');
      return null;
    }
  
    if (!this.adjacencyList[u]) {
      console.log(`Вершина "${u}" не найдена.`);
      return null;
    }
    if (!this.adjacencyList[v]) {
      console.log(`Вершина "${v}" не найдена.`);
      return null;
    }
  
    const uEdges = this.adjacencyList[u];
    const vEdges = new Set((this.adjacencyList[v] || []).map(edge => edge.vertex));
  
    for (let edge of uEdges) {
      if (!vEdges.has(edge.vertex)) {
        console.log(`Вершина ${edge.vertex} имеет дугу из ${u}, но не из ${v}.`);
        return edge.vertex;
      }
    }
  
    console.log(`Нет таких вершин, куда есть дуга из ${u}, но нет из ${v}.`);
    return null;
  }
  

  findMutualVertices(vertex) {
    if (!this.adjacencyList[vertex]) {
      console.log(`Вершина "${vertex}" не найдена в графе.`);
      return [];
    }

    const outgoing = new Set(this.adjacencyList[vertex].map(edge => edge.vertex)); // Исходящие вершины
    const incoming = new Set();

    // Поиск входящих рёбер
    for (const [key, edges] of Object.entries(this.adjacencyList)) {
      if (edges.some(edge => edge.vertex === vertex)) {
        incoming.add(key);
      }
    }

    // Пересечение исходящих и входящих вершин
    const mutualVertices = Array.from(outgoing).filter(v => incoming.has(v));

    // Выводим результат
    console.log(
      mutualVertices.length
        ? `Вершины, которые одновременно заходят в "${vertex}" и исходят из неё: ${mutualVertices.join(', ')}.`
        : `Нет вершин, которые одновременно заходят в "${vertex}" и исходят из неё.`
    );

    return mutualVertices;
  }


  
  addEdge(from, to, weight = 1) {
    if (!this.adjacencyList[from]) {
      console.error(`Ошибка: Вершина "${from}" не существует. Сначала добавьте её с помощью addVertex.`);
      return;
    }
    if (!this.adjacencyList[to]) {
      console.error(`Ошибка: Вершина "${to}" не существует. Сначала добавьте её с помощью addVertex.`);
      return;
    }
  
    const existingEdge = this.adjacencyList[from].some(edge => edge.vertex === to);
    if (!existingEdge) {
      const edge = this.weighted ? { vertex: to, weight } : { vertex: to }; // Создаём ребро с весом или без.
      this.adjacencyList[from].push(edge);
    }
  
    if (!this.directed) {
      const reverseExistingEdge = this.adjacencyList[to].some(edge => edge.vertex === from);
      if (!reverseExistingEdge) {
        const reverseEdge = this.weighted ? { vertex: from, weight } : { vertex: from }; // Создаём обратное ребро.
        this.adjacencyList[to].push(reverseEdge);
      }
    }
  }
  
  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      delete this.adjacencyList[vertex]; // Удаляем вершину.

      for (let key in this.adjacencyList) {
        this.adjacencyList[key] = this.adjacencyList[key].filter(edge => edge.vertex !== vertex);
      }
    } else {
      console.error(`Вершина "${vertex}" не существует.`);
    }
  }

  removeEdge(from, to) {
    if (this.adjacencyList[from]) {
      this.adjacencyList[from] = this.adjacencyList[from].filter(edge => edge.vertex !== to);
    }
    if (!this.directed && this.adjacencyList[to]) {
      this.adjacencyList[to] = this.adjacencyList[to].filter(edge => edge.vertex !== from);
    }
  }

  getEdges() {
    const edges = [];
    for (let vertex in this.adjacencyList) {
      for (let edge of this.adjacencyList[vertex]) {
        if (this.directed || vertex < edge.vertex) {
          edges.push(this.weighted ? [vertex, edge.vertex, edge.weight] : [vertex, edge.vertex]);
        }
      }
    }
    return edges;
  }

  exportToFile(filePath) {
    let result = '';
    for (let vertex in this.adjacencyList) {
      for (let edge of this.adjacencyList[vertex]) {
        result += this.weighted
          ? `${vertex},${edge.vertex},${edge.weight}\n`
          : `${vertex},${edge.vertex}\n`;
      }
    }
    fs.writeFileSync(filePath, result.trim());
    console.log(`Граф экспортирован в файл: ${filePath}`);
  }

  printAdjacencyList() {
    console.log(this.adjacencyList);
  }
}

// Интерфейс для работы с графом.
const graphInterface = () => {
  const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askFileAction = () => {
    rl.question('Вы хотите импортировать граф из файла (1) или создать новый (2)? ', fileAction => {
      if (fileAction.trim() === '1') {
        rl.question('Введите путь к файлу: ', filePath => {
          const graph = Graph.fromFile(filePath.trim());
          console.log('Граф импортирован.');
          askType(graph); // Переход к выбору типа графа после импорта.
        });
      } else if (fileAction.trim() === '2') {
        console.log('Создаём новый граф.');
        askType(Graph.emptyGraph()); // Создание нового пустого графа.
      } else {
        console.log('Неверный выбор.');
        askFileAction();
      }
    });
  };

  const askType = graph => {
    rl.question('Выберите тип графа (0 - неориентированный, 1 - ориентированный): ', directedAnswer => {
      graph.directed = directedAnswer.trim() === '1';
      rl.question('Граф взвешенный? (0 - нет, 1 - да): ', weightedAnswer => {
        graph.weighted = weightedAnswer.trim() === '1';
        console.log(graph.directed ? 'Ориентированный граф.' : 'Неориентированный граф.');
        console.log(graph.weighted ? 'Взвешенный граф.' : 'Невзвешенный граф.');
        askMenu(graph);
      });
    });
  };

  const menu = `
1. Добавить вершину
2. Добавить ребро
3. Удалить вершину
4. Удалить ребро
5. Показать список смежности
6. Экспорт графа в файл
7. Выход
8. Можно ли попасть из вершины u в вершину v через одну какую-либо вершину орграфа
9. Существует ли вершина, в которую есть дуга из вершины u, но нет из v.
10. Удалить дуги без обратных парных дуг
11. Проверить, является ли граф ацикличным
12. Вычислить цикломатическое число графа

Выберите нужный вариант: `;

const askMenu = graph => {
  rl.question(menu, answer => {
    switch (answer.trim()) {
      case '1':
        rl.question('Введите вершину: ', vertex => {
          graph.addVertex(vertex.trim());
          askMenu(graph);
        });
        break;
      case '2':
        rl.question(
          graph.weighted ? 'Введите ребро (Откуда, Куда, Вес): ' : 'Введите ребро (Откуда, Куда): ',
          input => {
            const [from, to, weight] = input.split(',').map(x => x.trim());
            graph.addEdge(from, to, graph.weighted ? parseFloat(weight) : undefined);
            askMenu(graph);
          }
        );
        break;
      case '3':
        rl.question('Введите вершину для удаления: ', vertex => {
          graph.removeVertex(vertex.trim());
          askMenu(graph);
        });
        break;
      case '4':
        rl.question('Введите ребро для удаления (Откуда, Куда): ', input => {
          const [from, to] = input.split(',').map(x => x.trim());
          graph.removeEdge(from, to);
          askMenu(graph);
        });
        break;
      case '5':
        graph.printAdjacencyList();
        askMenu(graph);
        break;
      case '6':
        rl.question('Введите путь к файлу для экспорта: ', filePath => {
          graph.exportToFile(filePath.trim());
          askMenu(graph);
        });
        break;
      case '7':
        console.log('Выход из программы.');
        rl.close();
        break;
      case '8': // Новый пункт для поиска вершины
        rl.question('Введите вершину u: ', u => {
          rl.question('Введите вершину v: ', v => {
            graph.findVertexWithEdgeFromUButNotV(u.trim(), v.trim());
            askMenu(graph); // Возвращаемся в меню
          });
        });
        break;
      case '9': // Новый пункт меню
        rl.question('Введите вершину: ', vertex => {
          graph.findMutualVertices(vertex.trim());
          askMenu(graph); // Возвращаемся в меню
        });
        break;
      case '10': // Новый пункт меню
        graph.filterMutualEdges();
        askMenu(graph); // Возвращаемся в меню
        break;
      case '11': // Проверка на ацикличность
        if (graph.isAcyclic()) {
          console.log('Граф является ацикличным.');
        } else {
          console.log('В графе есть циклы.');
        }
        askMenu(graph); // Возвращаемся в меню
        break;
      case '12': // Вычисление цикломатического числа
        const cyclomaticNumber = graph.calculateCyclomaticNumber();
        console.log(`Цикломатическое число графа: ${cyclomaticNumber}`);
        askMenu(graph); // Возвращаемся в меню
        break;
      default:
        console.log('Неверный выбор. Попробуйте снова.');
        askMenu(graph);
        break;
    }
  });
};

  askFileAction(); // Начинаем с выбора действия: импорт или создание нового графа.
};

graphInterface(); // Запуск интерфейса.
