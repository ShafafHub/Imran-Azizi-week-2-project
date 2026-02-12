let products = [
  { id: 1, name: "Phone", price: 500 },
  { id: 2, name: "Laptop", price: 1200 }
];

export function listProducts() {
  return products;
}

export function findById(id) {
  return products.find(p => p.id === id);
}

export function createProduct(data) {
  const newProduct = { id: Date.now(), ...data };
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(id, data) {
  const product = findById(id);
  if (!product) return null;
  Object.assign(product, data);
  return product;
}

export function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}
