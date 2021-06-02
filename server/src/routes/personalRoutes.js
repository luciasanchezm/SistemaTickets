const express = require("express");
const {
	editarPersonal,
	agregarPersonal,
	listarPersonal,
	personalPorId,
} = require("../controllers/personalController");

const personalRoutes = express.Router();

personalRoutes.get("/personal", listarPersonal);

personalRoutes.get("/personal/:id", personalPorId);

personalRoutes.post("/personal", agregarPersonal);

personalRoutes.put("/personal/:id", editarPersonal);

module.exports = personalRoutes;
