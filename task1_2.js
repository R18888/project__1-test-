// Создаем массив объектов типа Product
var products = [
    { name: "Apple", price: 1.2, category: "Fruit" },
    { name: "Banana", price: 0.8, category: "Fruit" },
    { name: "Laptop", price: 1000, category: "Electronics" },
    { name: "Shoes", price: 50, category: "Fashion" },
    { name: "Shirt", price: 20, category: "Fashion" },
];
// Реализуем функцию фильтрации продуктов по диапазону цен
function filterProductsByPriceRange(products, minPrice, maxPrice) {
    return products.filter(function (product) { return product.price >= minPrice && product.price <= maxPrice; });
}
// Пример использования функции
var filteredProducts = filterProductsByPriceRange(products, 10, 1000);
console.log(filteredProducts);
