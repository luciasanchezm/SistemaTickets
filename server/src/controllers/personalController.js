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

const personaPorId = (req, res) => {
	const {id} = req.params;
	if (connection) {
		let sql = "SELECT * FROM personal WHERE id = ?";
		connection.query(sql, [id], (err, persona) => {
			if (err) {
				res.status(400).json(err);
			} else {
				console.log(persona);
				res.json(persona[0]);
			}
		});
	}
};

const agregarPersona = (req, res) => {
	if (connection) {
		console.log(req.body);
		const personal = req.body;

		if (!personal.nombre) {
			return res
				.status(400)
				.send({ok: false, mensaje: "Campo 'nombre' no puede estar vacío."});
		}
		if (!personal.apellidos) {
			return res
				.status(400)
				.send({ok: false, mensaje: "Campo 'apellidos' no puede estar vacío."});
		}

		const sql = "INSERT INTO personal set ?";

		connection.query(sql, [personal], (err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.json({ok: true, data, mensaje: "Persona creada con éxito."});
			}
		});
	}
};

const editarPersona = (req, res) => {
	if (connection) {
		const {id} = req.params;
		const persona = req.body;

		let sql = "UPDATE personal set ? WHERE id = ?";

		connection.query(sql, [persona, id], (err, data) => {
			if (err) {
				res.json(err);
			} else {
				let mensaje = "";
				if (data.changedRows === 0) {
					mensaje = "La información es la misma";
				} else {
					mensaje = "Persona actualizada con éxito.";
				}

				res.json({ok: true, data, mensaje});
			}
		});
	}
};

const eliminarPersona = (req, res) => {
	const {id} = req.params;
	if (existePersona(id)) return res.json({mensaje: "No existe la persona."});
	if (connection) {
		let sql = "DELETE FROM personal WHERE id = ?";
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

const existePersona = (id) => {
	const sql = "SELECT id FROM personal WHERE id = ?";
	let existe = false;
	connection.query(sql, [id], (err, data) => {
		existe = !err;
		console.log(data);
	});
	return existe;
};

module.exports = {
	listarPersonal,
	agregarPersona,
	editarPersona,
	personaPorId,
	eliminarPersona,
};
