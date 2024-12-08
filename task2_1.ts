// Определяем интерфейс Customer
interface Customer {
  name: string;
  age: number;
  email: string;
}

// Класс CustomerList с обобщённым типом T, который расширяет Customer
class CustomerList<T extends Customer> {
  private customers: T[] = []; // Массив для хранения объектов типа T

  // Метод для добавления клиента в список
  addCustomer(customer: T): void {
      this.customers.push(customer);
  }

  // Метод для поиска клиента по имени
  getCustomerByName(name: string): T | undefined {
      return this.customers.find(customer => customer.name === name);
  }
}

// Пример использования

// Создаём экземпляр CustomerList
const customerList = new CustomerList<Customer>();

// Добавляем клиентов
customerList.addCustomer({ name: "Alice", age: 25, email: "alice@example.com" });
customerList.addCustomer({ name: "Bob", age: 30, email: "bob@example.com" });
customerList.addCustomer({ name: "Charlie", age: 35, email: "charlie@example.com" });

// Ищем клиента по имени
const foundCustomer = customerList.getCustomerByName("Alice");
if (foundCustomer) {
  console.log("Клиент найден:", foundCustomer);
} else {
  console.log("Клиент не найден");
}

// Пример вывода:
// Клиент найден: { name: 'Alice', age: 25, email: 'alice@example.com' }
