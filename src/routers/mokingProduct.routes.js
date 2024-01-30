import { Router } from "express";
import { getMockProducts } from "../controllers/mokingProduct.controller.js";


const RouterMoking = Router();

RouterMoking.get('/', getMockProducts);

export default RouterMoking;
