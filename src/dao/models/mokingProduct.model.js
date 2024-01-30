import { faker } from "@faker-js/faker";

function generateMockProducts(count) {
  const productsMoking = [];
  for (let i = 0; i < count; i++) {
    const product = {
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.database.mongodbObjectId(),
      price: parseFloat(faker.commerce.price()),
      stock: faker.number.int({ min: 1, max: 100 }),
      category: faker.commerce.department(),
    };
    productsMoking.push(product);
  }
  return productsMoking;
}

export { generateMockProducts };