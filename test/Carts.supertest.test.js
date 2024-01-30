import mongoose from "mongoose";
import "dotenv/config";
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8081");

await mongoose.connect(process.env.MONGO_URL);

describe("Test CRUD del carrito en api/carts", function () {
  it("Ruta: api/carts metodo Post", async () => {
    const { ok } = await requester.post("/api/carts");

    expect(ok).to.be.ok;
  });
});

describe("Pruebas para la ruta /api/carts/:cid/products/:pid", () => {
  it("RUta: api/carts metodo Post", async () => {
    
    const carritoId = "6584c98fa6ecad9716544b76";
    const productoId = "6584db007acdbbde32ac609b";
    const cantidad = 1;

    const response = await requester
      .post(`/api/carts/${carritoId}/products/${productoId}`)
      .send({ quantity: cantidad });

    expect(response.status).to.equal(200);
  });
});
