import mongoose from "mongoose";
import "dotenv/config";
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8081/");

await mongoose.connect(process.env.MONGO_URL);
let token = null;

describe("Test CRUD de productos en la ruta api/sessions", function () {
  it("iniciar sesion con post a traves de /sessions/login", async function () {
    this.timeout(5000);
    const user = {
      email: "alan.g.passarelli@gmail.com",
      password: "1234",
    };
    const { _body, ok } = await requester.post("api/sessions/login").send(user);
    token = _body.token;
    expect(ok).to.be.ok;
  });
});
