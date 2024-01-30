import mongoose from "mongoose";
import { userModel } from "../src/dao/models/users.models.js";
import Assert from "assert";
import { beforeEach } from "mocha";
import "dotenv/config";

const assert = Assert.strict;

await mongoose.connect(process.env.MONGO_URL);

describe("Test CRUD de usuario en la ruta api/users", function () {
  // antes de arrancar todo el test
  before(() => {
    console.log("Arrancando el Test");
  });

  //antes de arracar cada uno de los test

  beforeEach(() => {
    console.log("Comienza el test");
  });

  it("Obtener todos los usuarios mediante el metodo Get", async () => {
    const users = await userModel.find();

    assert.strictEqual(Array.isArray(users), true);
  });

  it("Obtener un usuario mediante el metodo Get", async () => {
    const user = await userModel.findById("6528380048e2f1a1cffec751");

    assert.strictEqual(typeof user, "object");
    assert.ok(user._id);
  });

  it("Crear un nuevo usuario mediante el metodo POst", async () => {
    const newuser = {
      first_name: "naldo",
      last_name: "Pascal",
      email: "prueba56841@prueba.com",
      password: "1234",
      age: 55,
    };

    const user = await userModel.create(newuser);

    assert.ok(user._id);
  });

  it("Actualizar un usuario mediante el metodo Put", async () => {
    const updateUser = {
      first_name: "javier",
      last_name: "perez",
      email: "prueba5684@prueba.com",
      password: "1234",
      age: 55,
    };

    const user = await userModel.findByIdAndUpdate(
      "65283a3616df8ba7922549e5",
      updateUser
    );

    assert.ok(user._id);
  });

  it("Eliminar un usuario mediante el metodo Delete", async () => {
    const result = await userModel.findByIdAndDelete(
      "65282a47123c03c103997755"
    );

    assert.strictEqual(typeof result, "object");
  });
});
