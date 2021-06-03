const connection = require("../config/connection");
const {existePersonal} = require("./personalController");
const {existeCategoria} = require("./categoriasController");

const listarTickets = (req, res) => {
	if (connection) {
		let sql = "SELECT * FROM tickets";
		connection.query(sql, (err, tickets) => {
			if (err) {
				res.status(400).json(err);
			} else {
				console.log(tickets);
				res.json(tickets);
			}
		});
	}
};

const agregarTicket = (req, res) => {
	if (connection) {
		console.log(req.body);
		const ticket = req.body;

		if (!ticket.personal) {
			return res
				.status(400)
				.send({ok: false, mensaje: "Campo 'personal' no puede estar vacío."});
		}
		if (!existePersonal(ticket.personal)) {
			return res.status(400).send({
				ok: false,
				mensaje: `El personal con el id ${ticket.personal} no existe.`,
			});
		}
		if (!ticket.categoria) {
			return res
				.status(400)
				.send({ok: false, mensaje: "Campo 'categoria' no puede estar vacío."});
		}
		if (!existeCategoria(ticket.categoria)) {
			return res.status(400).send({
				ok: false,
				mensaje: `La categoría con el id ${ticket.personal} no existe.`,
			});
		}
		if (!ticket.nombre) {
			return res
				.status(400)
				.send({ok: false, mensaje: "Campo 'nombre' no puede estar vacío."});
		}
		if (!ticket.prioridad) {
			return res
				.status(400)
				.send({ok: false, mensaje: "Campo 'prioridad' no puede estar vacío."});
		}

		const sql = "INSERT INTO personal set ?";

		connection.query(sql, [personal], (err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.json({ok: true, data, mensaje: "Ticket creado con éxito."});
			}
		});
	}
};

const editarTicket = (req, res) => {
	if (connection) {
		const {id} = req.params;
		const ticket = req.body;

		let sql = "UPDATE tickets set ? WHERE id = ?";

		connection.query(sql, [ticket, id], (err, data) => {
			if (err) {
				res.json(err);
			} else {
				let mensaje = "";
				if (data.changedRows === 0) {
					mensaje = "La información es la misma";
				} else {
					mensaje = "Ticket actualizado con exito.";
				}

				res.json({ok: true, data, mensaje});
			}
		});
	}
};

const cambiarTicketEstatus = (req, res) => {
	if (connection) {
		const {id} = req.params;
		const estatus = req.body;

		let sql = "UPDATE tickets set estatus = ? WHERE id = ?";

		connection.query(sql, [estatus, id], (err, data) => {
			if (err) {
				res.json(err);
			} else {
				let mensaje = "";
				if (data.changedRows === 0) {
					mensaje = "El estatus es la misma";
				} else {
					mensaje = "Estatus actualizado con exito.";
				}

				res.json({ok: true, data, mensaje});
			}
		});
	}
};

module.exports = {
	listarTickets,
	agregarTicket,
	editarTicket,
	cambiarTicketEstatus,
};
