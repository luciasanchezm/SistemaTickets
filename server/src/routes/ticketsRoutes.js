const express = require("express");
const {
	listarTickets,
	agregarTicket,
	editarTicket,
	cambiarTicketEstatus,
} = require("../controllers/ticketsController");

const ticketsRoutes = express.Router();

ticketsRoutes.get("/tickets", listarTickets);

ticketsRoutes.post("/ticket", agregarTicket);

ticketsRoutes.put("/ticket/:id", editarTicket);

ticketsRoutes.put("/ticketStatus/:id", cambiarTicketEstatus);

module.exports = ticketsRoutes;
