<template>
	<div>
		<h1>Categorías</h1>
		<b-button variant="primary" to="/categorias/agregar"
			><font-awesome-icon icon="plus"
		/></b-button>

		<Table emptyText="No hay categorías." :items="categorias" :fields="campos" :busy="loading">
			<template slot="actions" slot-scope="{item}">
				<b-button class="btn-danger" @click="onEliminar(item)">
					<font-awesome-icon icon="trash" />
				</b-button>
			</template>
		</Table>
	</div>
</template>

<script>
import Table from "../../components/Table";
import {mapState, mapActions} from "vuex";

export default {
	name: "CategoriasPage",
	components: {
		Table,
	},
	data() {
		return {
			campos: [
				{key: "id", label: "Clave"},
				{key: "nombre"},
				{key: "actions", label: "Acciones"},
			],
		};
	},
	computed: {
		...mapState(["categorias", "loading"]),
	},
	methods: {
		...mapActions(["listarCategorias", "eliminarCategoria"]),
		onEliminar(item) {
			console.log("Eliminar", item.item.id);
			this.$bvModal
				.msgBoxConfirm("Esta opción no se puede deshacer.", {
					title: "Eliminar Categoria",
					size: "sm",
					buttonSize: "sm",
					okVariant: "danger",
					okTitle: "Aceptar",
					cancelTitle: "Cancelar",
					footerClass: "p-2",
					centered: true,
				})
				.then((value) => {
					if (value) {
						this.eliminarCategoria({
							id: item.item.id,
							onComplete: (response) => {
								this.$notify({
									type: "success",
									title: response.data.mensaje,
								});
								this.listarCategorias();
							},
						});
					}
				})
				.catch((err) => {
					// An error occurred
				});
		},
	},
	mounted() {
		this.listarCategorias();
	},
};
</script>
