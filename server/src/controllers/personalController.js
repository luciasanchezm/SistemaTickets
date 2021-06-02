const connection = require("../config/connection");

const listarPersonal = (req, res) => {
	if (connection) {
		let sql = "SELECT * FROM personal";
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

const personalPorId = (req, res) => {
	const {id} = req.params;
	if (connection) {
		let sql = "SELECT * FROM personal WHERE id = ?";
		connection.query(sql, [id], (err, personal) => {
			if (err) {
				res.status(400).json(err);
			} else {
				console.log(personal);
				res.json(personal);
			}
		});
	}
};

const agregarPersonal = (req, res) => {
	if (connection) {
		console.log(req.body);
		const personal = req.body;

		if (!personal.nombre) {
			return res
				.status(400)
				.send({error: true, mensaje: "Campo 'nombre' no puede estar vacío."});
		}
		if (!personal.apellidos) {
			return res
				.status(400)
				.send({error: true, mensaje: "Campo 'apellidos' no puede estar vacío."});
		}

		const sql = "INSERT INTO personal set ?";

		connection.query(sql, [personal], (err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.json({error: false, data, mensaje: "Personal creado con éxito."});
			}
		});
	}
};

const editarPersonal = (req, res) => {
	if (connection) {
		const {id} = req.params;
		const personal = req.body;

		let sql = "UPDATE personal set ? WHERE id = ?";

		connection.query(sql, [personal, id], (err, data) => {
			if (err) {
				res.json(err);
			} else {
				let mensaje = "";
				if (data.changedRows === 0) {
					mensaje = "La información es la misma";
				} else {
					mensaje = "Personal actualizado con exito.";
				}

				res.json({error: false, data, mensaje});
			}
		});
	}
};

const existePersonal = (id) => {
	const sql = "SELECT id FROM personal WHERE id = ?";
	let existe = false;
	connection.query(sql, [id], (err, data) => {
		existe = !err;
		console.log(data);
	});
	return error;
};

module.exports = {
	listarPersonal,
	agregarPersonal,
	editarPersonal,
	existePersonal,
	personalPorId,
};
