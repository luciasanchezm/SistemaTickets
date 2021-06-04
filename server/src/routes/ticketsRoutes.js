const express = require("express");
const {
	listarTickets,
	ticketPorId,
	agregarTicket,
	editarTicket,
	cambiarTicketEstatus,
	eliminarTicket,
} = require("../controllers/ticketsController");

const ticketsRoutes = express.Router();

ticketsRoutes.get("/tickets", listarTickets);

ticketsRoutes.get("/tickets/:id", ticketPorId);

ticketsRoutes.post("/tickets", agregarTicket);

ticketsRoutes.put("/tickets/:id", editarTicket);

ticketsRoutes.delete("/tickets/:id", eliminarTicket);

ticketsRoutes.put("/ticketStatus/:id", cambiarTicketEstatus);

module.exports = ticketsRoutes;
