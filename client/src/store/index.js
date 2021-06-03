import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		categorias: [],
		personal: [],
		persona: {},
		loading: false,
	},
	mutations: {
		SET_CATEGORIAS(state, categorias) {
			state.categorias = categorias;
		},
		SET_PERSONAL(state, personal) {
			state.personal = personal;
		},
		SET_PERSONA(state, persona) {
			state.persona = persona;
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
	},
	modules: {},
});
