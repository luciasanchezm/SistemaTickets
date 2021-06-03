<template>
	<div>
		<h1>Agregar Persona</h1>
		<b-form @submit.prevent="guardarPersona()">
			<Input
				v-model="persona.nombre"
				id="nombre"
				titulo="Nombre"
				placeholder="Ingrese el nombre de la categoría"
				:maxlength="50"
				:error="erroresValidacion && !validacionNombre"
				mensajeError="Es necesario ingresar el nombre"
				class="mb-2 "
			/>
			<Input
				v-model="persona.apellidos"
				id="apellidos"
				titulo="Apellidos"
				placeholder="Ingrese los apellidos de la persona"
				:maxlength="80"
				:error="erroresValidacion && !validacionApellidos"
				mensajeError="Es necesario ingresar los apellidos"
				class="mb-2 "
			/>
			<Input
				v-model="persona.telefono"
				id="telefono"
				titulo="Teléfono"
				placeholder="Ingrese el teléfono de la persona"
				:maxlength="10"
				:minlength="10"
				class="mb-2 "
			/>
			<Input
				v-model="persona.direccion"
				id="direccion"
				titulo="Dirección"
				placeholder="Ingrese la dirección de la persona"
				:maxlength="150"
				class="mb-2 "
			/>
			<b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
		</b-form>
	</div>
</template>

<script>
import {mapActions} from "vuex";
import Input from "../../components/Input";
export default {
	name: "Agregar",
	components: {
		Input,
	},
	data() {
		return {
			persona: {
				nombre: "",
				apellidos: "",
				telefono: "",
				direccion: "",
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
		...mapActions(["agregarPersona"]),
		guardarPersona() {
			if (this.validacionNombre && this.validacionApellidos) {
				this.erroresValidacion = false;
				//Guardar persona
				this.agregarPersona({
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
};
</script>

<style></style>
