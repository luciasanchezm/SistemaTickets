<template>
	<div>
		<h1 class="fadeInDown">Personal</h1>
		<b-button class="bounceIn delayed-01" id="boton" variant="primary" to="/personal/agregar"
			><font-awesome-icon icon="plus"
		/></b-button>

		<Table
			class="fadeInUp delayed-02"
			emptyText="No hay personal."
			:items="personal"
			:fields="campos"
			:busy="loading"
		>
			<template slot="actions" slot-scope="{item}">
				<b-button class="btn-secondary me-1" @click="onEditar(item)">
					<font-awesome-icon icon="pen" />
				</b-button>
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
	name: "PersonalPage",
	components: {
		Table,
	},
	data() {
		return {
			campos: [
				{key: "id", label: "Clave", sortable: true},
				{key: "nombre", sortable: true},
				{key: "apellidos", sortable: true},
				{key: "telefono", sortable: true},
				{key: "direccion", sortable: true},
				{key: "actions", label: "Acciones"},
			],
		};
	},
	computed: {
		...mapState(["personal", "loading"]),
	},
	methods: {
		...mapActions(["listarPersonal", "eliminarPersona", "editarPersona"]),
		onEditar(item) {
			console.log("Editar", item.item.id);
			this.$router.push({
				name: "EditarPersona",
				params: {
					id: item.item.id,
				},
			});
		},
		onEliminar(item) {
			this.$bvModal
				.msgBoxConfirm("Esta opción no se puede deshacer.", {
					title: "Eliminar Personal",
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
						this.eliminarPersona({
							id: item.item.id,
							onComplete: (response) => {
								this.$notify({
									type: "success",
									title: response.data.mensaje,
								});
								this.listarPersonal();
							},
							onError: (err) => {
								this.$notify({
									type: "error",
									title:
										"Error al eliminar. Probablemente otra tabla depende de ese dato.",
								});
							},
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	mounted() {
		this.listarPersonal();
	},
};
</script>
