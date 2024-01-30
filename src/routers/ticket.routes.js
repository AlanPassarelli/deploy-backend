import { Router } from "express";
import { createTicket,getAllTickets,getTicketByCode } from "../controllers/ticket.controller.js";

const routerT = Router();

// Ruta para crear un nuevo ticket
routerT.post('/tickets', createTicket);

// Ruta para obtener todos los tickets
routerT.get('/tickets', getAllTickets);

// Ruta para obtener un ticket por su código único
routerT.get('/tickets/:code', getTicketByCode);

export default routerT;
