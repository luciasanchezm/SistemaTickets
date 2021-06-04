<template>
	<div>
		<h1>Agregar Ticket</h1>
		<b-form @submit.prevent="guardarTicket()">
			<Input
				v-model="ticket.nombre"
				id="nombre"
				titulo="Nombre"
				placeholder="Ingrese el nombre del ticket"
				:maxlength="50"
				:error="erroresValidacion && !validacionNombre"
				mensajeError="Es necesario ingresar el nombre"
				class="mb-2 "
			/>
			<Input
				v-model="ticket.descripcion"
				id="descripcion"
				titulo="Descripción"
				placeholder="Ingrese la descripción del ticket"
				:maxlength="100"
				class="mb-2 "
			/>
			<Select
				v-model="ticket.prioridad"
				id="prioridad"
				titulo="Prioridad"
				:options="options"
				:error="erroresValidacion && !validacionPrioridad"
				:change="setPrioridad"
				mensajeError="Es necesaria una prioridad"
			/>
			<Select
				v-model="ticket.persona_id"
				id="persona"
				titulo="Persona"
				:options="personal"
				:error="erroresValidacion && !validacionPersonaID"
				:change="setPersonaID"
			/>
			<Select
				v-model="ticket.categoria_id"
				id="categoria"
				titulo="Categoría"
				:options="categorias"
				:error="erroresValidacion && !validacionCategoriaID"
				:change="setCategoriaID"
			/>
			<b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
		</b-form>
	</div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Input from "../../components/Input";
import Select from "../../components/Select";
export default {
	name: "Agregar",
	components: {
		Input,
		Select,
	},

	data() {
		return {
			options: [
				{value: "", text: "Seleccione una opción...", disabled: true},
				{value: "1", text: "BAJA"},
				{value: "2", text: "MEDIA"},
				{value: "3", text: "ALTA"},
			],
			ticket: {
				nombre: "",
				descripcion: "",
				prioridad: "",
				persona_id: "",
				categoria_id: "",
				estatus: "ABT",
			},
			erroresValidacion: false,
		};
	},
	computed: {
		...mapState(["personal", "categorias"]),
		validacionNombre() {
			return this.ticket.nombre.trim();
		},
		validacionPrioridad() {
			return this.ticket.prioridad;
		},
		validacionPersonaID() {
			return this.ticket.persona_id;
		},
		validacionCategoriaID() {
			return this.ticket.categoria_id;
		},
	},
	methods: {
		...mapActions(["agregarTicket", "listarPersonalPorNombre", "listarCategoriasPorNombre"]),
		setPrioridad(prioridad) {
			this.ticket.prioridad = prioridad;
		},
		setCategoriaID(id) {
			this.ticket.categoria_id = id;
		},
		setPersonaID(id) {
			this.ticket.persona_id = id;
		},
		guardarTicket() {
			if (
				this.validacionNombre &&
				this.validacionPrioridad &&
				this.validacionPersonaID &&
				this.validacionCategoriaID
			) {
				this.erroresValidacion = false;
				//Guardar ticket
				this.agregarTicket({
					params: this.ticket,
					onComplete: (response) => {
						console.log(response.data);
						this.$notify({
							type: "success",
							title: response.data.mensaje,
						});
						this.$router.push({
							name: "TicketsPage",
						});
					},
					onError: (error) => {
						console.log(error.response.data);
						this.$notify({
							type: "error",
							title: error.response.data.mensaje,
						});
					},
				});
			} else {
				this.erroresValidacion = true;
			}
		},
	},
	created() {
		this.listarPersonalPorNombre();
		this.listarCategoriasPorNombre();
	},
};
</script>

<style></style>
