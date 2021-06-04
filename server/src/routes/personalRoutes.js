const express = require("express");
const {
	editarPersona,
	agregarPersona,
	listarPersonal,
	personaPorId,
	eliminarPersona,
} = require("../controllers/personalController");

const personalRoutes = express.Router();

personalRoutes.get("/personal", listarPersonal);

personalRoutes.get("/personal/:id", personaPorId);

personalRoutes.post("/personal", agregarPersona);

personalRoutes.put("/personal/:id", editarPersona);

personalRoutes.delete("/personal/:id", eliminarPersona);

module.exports = personalRoutes;
