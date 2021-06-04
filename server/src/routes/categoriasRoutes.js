const express = require("express");

const categoriasRoutes = express.Router();

const {
	listarCategorias,
	agregarCategoria,
	eliminarCategoria,
} = require("../controllers/categoriasController");

categoriasRoutes.get("/categorias", listarCategorias);

categoriasRoutes.post("/categoria", agregarCategoria);

categoriasRoutes.delete("/categoria/:id", eliminarCategoria);

module.exports = categoriasRoutes;
