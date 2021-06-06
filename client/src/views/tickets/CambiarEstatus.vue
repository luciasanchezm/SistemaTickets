<template>
	<div>
		<h1 class="fadeInDown">Cambiar Estatus</h1>
		<b-form class="mt-3 fadeInRight delayed-02" @submit.prevent="guardarTicket()">
			<Input id="id" v-model="$route.params.id" titulo="ID" class="row" disabled />

			<div class="mb-3 row">
				<label class="col-sm-2 col-form-label text-start" for="estatus">Estatus</label>
				<div class="col-sm-10">
					<b-form-select
						class="form-control"
						id="estatus"
						v-model="ticket.estatus"
						:options="options"
					></b-form-select>
				</div>
			</div>

			<b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
		</b-form>
	</div>
</template>

<script>
import Vue from "vue";
import {mapActions} from "vuex";
import Input from "../../components/Input";

export default {
	name: "EditarTicket",
	components: {Input},
	data() {
		return {
			options: [
				{value: "", text: "Seleccione una opción...", disabled: true},
				{value: "ABT", text: "Abierto"},
				{value: "ESP", text: "En espera"},
				{value: "FIN", text: "Finalizado"},
			],
			ticket: {
				estatus: "",
			},
		};
	},
	computed: {},
	methods: {
		...mapActions(["obtenerTicket", "editarTicket"]),
		guardarTicket() {
			this.editarTicket({
				id: this.$route.params.id,
				params: this.ticket,
				onComplete: (response) => {
					this.$notify({
						type: "success",
						title: response.data.mensaje,
					});
					this.$router.push({
						name: "TicketsPage",
					});
				},
				onError: (error) => {
					this.$notify({
						type: "error",
						title: error.response.data.mensaje,
					});
				},
			});
		},
	},
	created() {
		this.obtenerTicket({
			id: this.$route.params.id,
			onComplete: (response) => {
				Vue.set(this, "ticket", response.data);
			},
			onError: (err) => {
				console.log(err);
			},
		});
	},
};
</script>

<style></style>
