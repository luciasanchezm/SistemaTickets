const connection = require("../config/connection");

const listarCategorias = (req, res) => {
	if (connection) {
		let sql = "SELECT * FROM categorias";
		connection.query(sql, (err, categorias) => {
			if (err) {
				res.status(400).json(err);
			} else {
				console.log(categorias);
				res.json(categorias);
			}
		});
	}
};

const eliminarCategoria = (req, res) => {
	const {id} = req.params;
	if (existeCategoria(id)) return res.json({mensaje: "No existe la categoría."});
	if (connection) {
		let sql = "DELETE FROM categorias WHERE id = ?";
		connection.query(sql, [id], (err, categorias) => {
			if (err) {
				res.status(400).json(err);
			} else {
				console.log(categorias);
				res.json(categorias);
			}
		});
	}
};

const agregarCategoria = (req, res) => {
	if (connection) {
		console.log(req.body);
		const {nombre} = req.body;

		if (!nombre) {
			return res.status(400).send({ok: false, mensaje: "Campo nombre no puede estar vacío."});
		}

		const sql = "INSERT INTO categorias set ?";

		connection.query(sql, [{nombre}], (err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.json({ok: true, data, mensaje: "Categoría creada con éxito."});
			}
		});
	}
};

const existeCategoria = (id) => {
	const sql = "SELECT id FROM categorias WHERE id = ?";
	let existe = false;
	connection.query(sql, [id], (err, data) => {
		existe = !err;
		console.log(data);
		console.log(err);
	});
	return existe;
};

module.exports = {
	listarCategorias,
	agregarCategoria,
	eliminarCategoria,
};
