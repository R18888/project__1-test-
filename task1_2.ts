// Определяем тип Product
type Product = {
  name: string;
  price: number;
  category: string;
};

// Создаем массив объектов типа Product
const products: Product[] = [
  { name: "Apple", price: 1.2, category: "Fruit" },
  { name: "Banana", price: 0.8, category: "Fruit" },
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Shoes", price: 50, category: "Fashion" },
  { name: "Shirt", price: 20, category: "Fashion" },
];

// Реализуем функцию фильтрации продуктов по диапазону цен
function filterProductsByPriceRange(
  products: Product[],
  minPrice: number,
  maxPrice: number
): Product[] {
  return products.filter(product => product.price >= minPrice && product.price <= maxPrice);
}

// Пример использования функции
const filteredProducts = filterProductsByPriceRange(products, 10, 1000);
console.log(filteredProducts);
