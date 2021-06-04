<template>
	<div>
		<h1>Editar Ticket</h1>
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
			<div class="mb-3 row">
				<label class="col-sm-2 col-form-label text-start" for="prioridad">Prioridad</label>
				<div class="col-sm-10">
					<b-form-select
						class="form-control"
						id="prioridad"
						v-model="ticket.prioridad"
						:options="options"
						required
					></b-form-select>
				</div>
				<span v-if="!validacionPrioridad" class="text-danger">Campo obligatorio</span>
			</div>
			<div class="mb-3 row">
				<label class="col-sm-2 col-form-label text-start" for="persona">Persona</label>
				<div class="col-sm-10">
					<b-form-select
						class="form-control"
						id="persona"
						v-model="ticket.persona_id"
						:options="personal"
						required
					></b-form-select>
				</div>
				<span v-if="!validacionPersonaID" class="text-danger">Campo obligatorio</span>
			</div>
			<div class="mb-3 row">
				<label class="col-sm-2 col-form-label text-start" for="categoria">Categoría</label>
				<div class="col-sm-10">
					<b-form-select
						class="form-control"
						id="categoria"
						v-model="ticket.categoria_id"
						:options="categorias"
						required
					></b-form-select>
				</div>
				<span v-if="!validacionCategoriaID" class="text-danger">Campo obligatorio</span>
			</div>

			<!-- 
				# Intenté utilizar el componente, pero siempre me 
				# marcaba error al momento de hacer el binding con v-model.

				<Select
				v-model="ticket.prioridad"
				id="prioridad2"
				titulo="Prioridad"
				:options="options"
				:error="erroresValidacion && !validacionPrioridad"
				:change="setPrioridad"
				mensajeError="Es necesaria una prioridad"
			/>
			<Select
				v-model="ticket.persona_id"
				id="persona2"
				titulo="Persona"
				:options="personal"
				:error="erroresValidacion && !validacionPersonaID"
				:change="setPersonaID"
			/>
			<Select
				v-model="ticket.categoria_id"
				id="categoria2"
				titulo="Categoría"
				:options="categorias"
				:error="erroresValidacion && !validacionCategoriaID"
				:change="setCategoriaID"
			/> -->
			<b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
		</b-form>
	</div>
</template>

<script>
import Vue from "vue";
import {mapActions, mapState} from "vuex";
import Input from "../../components/Input";
import Select from "../../components/Select";
export default {
	name: "EditarTicket",
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
				estatus: "",
			},
			erroresValidacion: false,
		};
	},
	computed: {
		...mapState(["personal", "categorias"]),
		setPrioridad(prioridad) {
			this.ticket.prioridad = prioridad;
		},
		setCategoriaID(id) {
			this.ticket.categoria_id = id;
		},
		setPersonaID(id) {
			this.ticket.persona_id = id;
		},
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
		...mapActions([
			"obtenerTicket",
			"listarPersonalPorNombre",
			"listarCategoriasPorNombre",
			"editarTicket",
		]),
		guardarTicket() {
			if (
				this.validacionNombre &&
				this.validacionPrioridad &&
				this.validacionPersonaID &&
				this.validacionCategoriaID
			) {
				this.erroresValidacion = false;
				//Guardar
				this.editarTicket({
					id: this.$route.params.id,
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
						console.log(error.response.data.mensaje);
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
		this.obtenerTicket({
			id: this.$route.params.id,
			onComplete: (response) => {
				Vue.set(this, "ticket", response.data);
			},
		});
	},
};
</script>

<style></style>
