<template>
	<div>
		<h1>Editar Persona</h1>
		<b-form @submit.prevent="guardarPersona()">
			<Input
				v-model="persona.nombre"
				id="nombre"
				titulo="Nombre"
				placeholder="Ingrese el nombre"
				:maxlength="50"
				:error="erroresValidacion && !validacionNombre"
				mensajeError="Es necesario ingresar el nombre"
				class="mb-2"
			/>
			<Input
				v-model="persona.apellidos"
				id="apellidos"
				titulo="Apellidos"
				placeholder="Ingrese los apellidos"
				:maxlength="80"
				:error="erroresValidacion && !validacionApellidos"
				mensajeError="Es necesario ingresar los apellidos"
				class="mb-2"
			/>
			<Input
				v-model="persona.telefono"
				id="telefono"
				titulo="Telefono"
				:maxlength="10"
				placeholder="Ingrese el teléfono"
				class="mb-2"
			/>
			<Input
				v-model="persona.direccion"
				id="direccion"
				titulo="Dirección"
				:maxlength="150"
				placeholder="Ingrese la dirección"
			/>
			<b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
		</b-form>
	</div>
</template>

<script>
import Vue from "vue";
import {mapActions, mapState} from "vuex";
import Input from "../../components/Input";
export default {
	name: "Editar",
	components: {
		Input,
	},
	data() {
		return {
			persona: {
				nombre: "",
				apellidos: "",
				direccion: "",
				telefono: "",
			},
			erroresValidacion: false,
		};
	},
	computed: {
		validacionNombre() {
			return this.persona.nombre.trim();
		},
		validacionApellidos() {
			return this.persona.apellidos.trim();
		},
	},
	methods: {
		...mapActions(["obtenerPersona", "editarPersona"]),
		guardarPersona() {
			console.log(this.persona);
			if (this.validacionNombre && this.validacionApellidos) {
				this.erroresValidacion = false;
				//Guardar
				this.editarPersona({
					id: this.$route.params.id,
					params: this.persona,
					onComplete: (response) => {
						console.log(response.data);
						this.$notify({
							type: "success",
							title: response.data.mensaje,
						});
						this.$router.push({
							name: "PersonalPage",
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
		this.obtenerPersona({
			id: this.$route.params.id,
			onComplete: (response) => {
				Vue.set(this, "persona", response.data);
			},
		});
	},
};
</script>

<style></style>
