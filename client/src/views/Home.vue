<template>
	<div class="home">
		<h1 class="fadeInDown">Bienvenido a <b>TicketWeb</b></h1>
		<div class="fadeInLeft delayed-01 mt-3 mb-3">
			<h3>Filtrar por:</h3>

			<span>Categoría</span>
			<div class="d-flex justify-content-center">
				<div class="col-8">
					<b-form-select
						class="form-control"
						v-model="categoriaSeleccionada"
						id="categoria"
						@change="setCategoria"
						:options="categorias"
					></b-form-select>
				</div>
			</div>
		</div>

		<b-card-group columns>
			<div
				class="m-3 col-3 fadeInUp delayed-02"
				v-for="ticket in tickets"
				v-bind:key="ticket.id"
			>
				<Card class="fadeInUp" :key="ticket.id" :ticket="ticket" />
			</div>
			<div class="fadeInUp mt-3" :key="'noinfo'" v-if="tickets.length === 0">
				<b-alert show variant="info">No hay tickets con la categoría seleccionada.</b-alert>
			</div>
		</b-card-group>
	</div>
</template>

<script>
import Card from "../components/Card";
import {mapActions, mapState} from "vuex";

export default {
	name: "Home",
	components: {Card},
	data() {
		return {
			categoriaSeleccionada: "-1",
		};
	},
	computed: {
		...mapState(["tickets", "loading", "categorias", "personal"]),
	},
	methods: {
		...mapActions(["filtrarTicketsPorCategoria", "listarCategoriasPorNombre"]),
		setCategoria(categoria) {
			this.categoriaSeleccionada = categoria;
			this.filtrarTicketsPorCategoria(categoria);
			//this.filteredTickets = this.tickets;
		},
	},
	created() {
		// El parámetro 'all' en true se usa para que, en lugar de tener por defecto "Seleccione una opción",
		// diga "Todas las categorías"
		this.listarCategoriasPorNombre({all: true});
		// -1 hace referencia a todos los tickets (sin filtro)
		this.filtrarTicketsPorCategoria("-1");
	},
};
</script>

<style>
div.m-3 {
	display: inline-block;
	transition: 0.2s;
}

div.m-3:hover {
	box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
	cursor: pointer;
}
</style>
