import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		categorias: [],
		personal: [],
		tickets: [],
		loading: false,
	},
	mutations: {
		SET_CATEGORIAS(state, categorias) {
			state.categorias = categorias;
		},
		SET_CATEGORIAS_POR_NOMBRE(state, categorias) {
			categorias = categorias.map((categoria) => {
				return {
					value: categoria.id,
					text: categoria.nombre,
				};
			});
			categorias.unshift({value: "", text: "Seleccione una opción...", disabled: true});
			state.categorias = categorias;
		},
		SET_PERSONAL(state, personal) {
			state.personal = personal;
		},
		SET_PERSONAL_POR_NOMBRE(state, personal) {
			personal = personal.map((persona) => {
				return {
					value: persona.id,
					text: `${persona.nombre} ${persona.apellidos}`,
				};
			});
			personal.unshift({value: "", text: "Seleccione una opción...", disabled: true});
			state.personal = personal;
		},
		SET_TICKETS(state, tickets) {
			tickets = tickets.map((ticket) => {
				let color = "secondary ";
				if (ticket.estatus === "ABT") color = "danger";
				else if (ticket.estatus === "ESP") color = "success";
				return {
					...ticket,
					_rowVariant: color,
				};
			});
			state.tickets = tickets;
		},
		SET_LOADING(state, payload) {
			state.loading = payload;
		},
	},
	actions: {
		// ===================== CATEGORÍAS ============================
		agregarCategoria({commit}, {params, onComplete, onError}) {
			axios
				.post("http://localhost:3000/categoria", params)
				.then(onComplete)
				.catch(onError);
		},
		listarCategorias({commit}) {
			commit("SET_LOADING", true);
			axios
				.get("http://localhost:3000/categorias")
				.then((response) => {
					commit("SET_CATEGORIAS", response.data);
				})
				.finally(() => commit("SET_LOADING", false));
		},
		listarCategoriasPorNombre({commit}) {
			commit("SET_LOADING", true);
			axios
				.get("http://localhost:3000/categorias")
				.then((response) => {
					commit("SET_CATEGORIAS_POR_NOMBRE", response.data);
				})
				.finally(() => commit("SET_LOADING", false));
		},
		eliminarCategoria({commit}, {id, onComplete, onError}) {
			axios
				.delete(`http://localhost:3000/categoria/${id}`)
				.then(onComplete)
				.catch(onError);
		},
		// ===================== FIN CATEGORÍAS ============================
		// =========================  PERSONAL ============================
		agregarPersona({commit}, {params, onComplete, onError}) {
			axios
				.post("http://localhost:3000/personal", params)
				.then(onComplete)
				.catch(onError);
		},
		listarPersonal({commit}) {
			commit("SET_LOADING", true);
			axios
				.get("http://localhost:3000/personal")
				.then((response) => {
					commit("SET_PERSONAL", response.data);
				})
				.finally(() => commit("SET_LOADING", false));
		},
		listarPersonalPorNombre({commit}) {
			commit("SET_LOADING", true);
			axios
				.get("http://localhost:3000/personal")
				.then((response) => {
					commit("SET_PERSONAL_POR_NOMBRE", response.data);
				})
				.finally(() => commit("SET_LOADING", false));
		},
		editarPersona({commit}, {id, params, onComplete, onError}) {
			axios
				.put(`http://localhost:3000/personal/${id}`, params)
				.then(onComplete)
				.catch(onError);
		},
		obtenerPersona({commit}, {id, onComplete, onError}) {
			axios
				.get(`http://localhost:3000/personal/${id}`)
				.then(onComplete)
				.catch(onError);
		},
		eliminarPersona({commit}, {id, onComplete, onError}) {
			axios
				.delete(`http://localhost:3000/personal/${id}`)
				.then(onComplete)
				.catch(onError);
		},
		// ==========================  END PERSONAL =================================
		// ==========================  TICKETS =================================
		agregarTicket({commit}, {params, onComplete, onError}) {
			axios
				.post("http://localhost:3000/tickets", params)
				.then(onComplete)
				.catch(onError);
		},
		listarTickets({commit}) {
			commit("SET_LOADING", true);
			axios
				.get("http://localhost:3000/tickets")
				.then((response) => {
					commit("SET_TICKETS", response.data);
				})
				.finally(() => commit("SET_LOADING", false));
		},
		editarTicket({commit}, {id, params, onComplete, onError}) {
			axios
				.put(`http://localhost:3000/tickets/${id}`, params)
				.then(onComplete)
				.catch(onError);
		},
		obtenerTicket({commit}, {id, onComplete, onError}) {
			axios
				.get(`http://localhost:3000/tickets/${id}`)
				.then(onComplete)
				.catch(onError);
		},
		eliminarTicket({commit}, {id, onComplete, onError}) {
			axios
				.delete(`http://localhost:3000/tickets/${id}`)
				.then(onComplete)
				.catch(onError);
		},

		// ==========================  END TICKETS =================================
	},
	modules: {},
});
