import { Router } from 'express';
import {
    getProducts,
    getProduct,
    deleteProduct,
    putProduct,
    postProduct,
  } from "../controllers/products.controller.js";
  import { authorization, passportError } from '../utils/messagesError.js';
  
  const productosRouter = Router();
  
  productosRouter.get("/", getProducts);
  
  productosRouter.get("/:id", getProduct);
  
  productosRouter.put(
    "/:id",
    passportError("jwt"),
    authorization("admin", "premium"),
    putProduct
  );
  
  productosRouter.delete(
    "/:id",
    passportError("jwt"),
    authorization("admin", "premium"),
    deleteProduct
  );
  
  productosRouter.post(
    "/",
    passportError("jwt"),
    authorization("admin", "premium"),
    postProduct
  );
  
  export default productosRouter;