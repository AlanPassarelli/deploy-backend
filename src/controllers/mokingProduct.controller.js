import { generateMockProducts } from "../dao/models/mokingProduct.model.js";

const getMockProducts = (req, res) => {
  const productsMoking = generateMockProducts(100);
  console.log(productsMoking);
  res.json(productsMoking);
};

export { getMockProducts };