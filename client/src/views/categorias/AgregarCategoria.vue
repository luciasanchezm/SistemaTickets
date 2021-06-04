<template>
	<div>
		<h1>Agregar Categoria</h1>
		<b-form @submit.prevent="guardarCategoria()">
			<Input
				v-model="categoria.nombre"
				id="nombre"
				titulo="Nombre"
				placeholder="Ingrese el nombre de la categoría"
				:maxlength="50"
				:error="erroresValidacion && !validacionNombre"
				mensajeError="Es necesario ingresar el nombre"
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
			categoria: {
				nombre: "",
			},
			erroresValidacion: false,
		};
	},
	computed: {
		validacionNombre() {
			return this.categoria.nombre.trim();
		},
	},
	methods: {
		...mapActions(["agregarCategoria"]),
		guardarCategoria() {
			if (this.validacionNombre) {
				this.erroresValidacion = false;
				//Guardar categoría
				this.agregarCategoria({
					params: this.categoria,
					onComplete: (response) => {
						console.log(response.data);
						this.$notify({
							type: "success",
							title: response.data.mensaje,
						});
						this.$router.push({
							name: "Categorias",
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
