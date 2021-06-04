const connection = require("../config/connection");
const {existePersona} = require("./personalController");
const {existeCategoria} = require("./categoriasController");

const listarTickets = (req, res) => {
	if (connection) {
		let sql = "SELECT * FROM tickets";
		connection.query(sql, (err, tickets) => {
			if (err) {
				res.status(400).json(err);
			} else {
				res.json(tickets);
			}
		});
	}
};

const ticketPorId = (req, res) => {
	const {id} = req.params;
	if (connection) {
		let sql = "SELECT * FROM tickets WHERE id = ?";
		connection.query(sql, [id], (err, tickets) => {
			if (err) {
				res.status(400).json(err);
			} else {
				res.json(tickets[0]);
			}
		});
	}
};

const agregarTicket = (req, res) => {
	if (connection) {
		const ticket = req.body;

		if (!ticket.persona_id) {
			return res
				.status(400)
				.send({ok: false, mensaje: "Campo 'personal' no puede estar vacío."});
		}
		if (!existePersona(ticket.persona_id)) {
			return res.status(400).send({
				ok: false,
				mensaje: `La persona con el id ${ticket.persona_id} no existe.`,
			});
		}
		if (!ticket.categoria_id) {
			return res
				.status(400)
				.send({ok: false, mensaje: "Campo 'categoria' no puede estar vacío."});
		}
		if (!existeCategoria(ticket.categoria_id)) {
			return res.status(400).send({
				ok: false,
				mensaje: `La categoría con el id ${ticket.categoria_id} no existe.`,
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

		const sql = "INSERT INTO tickets set ?";

		connection.query(sql, [ticket], (err, data) => {
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

const eliminarTicket = (req, res) => {
	const {id} = req.params;
	if (!existeTicket(id)) return res.json({mensaje: "No existe el ticket."});
	if (connection) {
		let sql = "DELETE FROM tickets WHERE id = ?";
		connection.query(sql, [id], (err, tickets) => {
			if (err) {
				res.status(400).json(err);
			} else {
				res.json(tickets);
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
					mensaje = "El estatus es el mismo.";
				} else {
					mensaje = "Estatus actualizado con exito.";
				}

				res.json({ok: true, data, mensaje});
			}
		});
	}
};

const existeTicket = async (id) => {
	const sql = "SELECT id FROM tickets WHERE id = ?";
	let existe = false;
	await connection.query(sql, [id], (err, data) => {
		if (!err) {
			existe = !!data;
		} else existe = false;
	});
	return existe;
};

module.exports = {
	listarTickets,
	ticketPorId,
	agregarTicket,
	editarTicket,
	eliminarTicket,
	cambiarTicketEstatus,
};
