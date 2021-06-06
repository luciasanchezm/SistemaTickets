const express = require("express");
const {
	listarTickets,
	ticketPorId,
	agregarTicket,
	editarTicket,
	cambiarTicketEstatus,
	eliminarTicket,
	filtrarPorCategoria,
} = require("../controllers/ticketsController");

const ticketsRoutes = express.Router();

ticketsRoutes.get("/tickets", listarTickets);

ticketsRoutes.get("/tickets/:id", ticketPorId);

ticketsRoutes.post("/tickets", agregarTicket);

ticketsRoutes.put("/tickets/:id", editarTicket);

ticketsRoutes.delete("/tickets/:id", eliminarTicket);

ticketsRoutes.put("/ticketStatus/:id", cambiarTicketEstatus);

ticketsRoutes.get("/filtrarTickets/:id", filtrarPorCategoria);

module.exports = ticketsRoutes;
