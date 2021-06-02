const express = require("express");

const categoriasRoutes = express.Router();

const {
	listarCategorias,
	agregarCategoria,
	borrarCategoria,
} = require("../controllers/categoriasController");

categoriasRoutes.get("/categorias", listarCategorias);

categoriasRoutes.post("/categoria", agregarCategoria);

categoriasRoutes.delete("/categoria/:id", borrarCategoria);

module.exports = categoriasRoutes;
