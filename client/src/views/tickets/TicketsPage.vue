<template>
	<div>
		<h1 class="fadeInDown">Tickets</h1>
		<b-button class="bounceIn delayed-01" variant="primary" to="/tickets/agregar"
			><font-awesome-icon icon="plus"
		/></b-button>

		<Table
			class="fadeInUp delayed-02"
			emptyText="No hay tickets."
			:items="tickets"
			:fields="campos"
			:busy="loading"
		>
			<template slot="actions" slot-scope="{item}">
				<b-button variant="success" class="me-1" @click="onCambiarEstatus(item)">
					<font-awesome-icon icon="sync-alt" />
				</b-button>
				<b-button variant="primary" class="me-1" @click="onEditar(item)">
					<font-awesome-icon icon="pen" />
				</b-button>
				<b-button variant="danger" @click="onEliminar(item)">
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
	name: "TicketsPage",
	components: {
		Table,
	},
	data() {
		return {
			campos: [
				{key: "id", label: "Clave", sortable: true},
				{key: "nombre", sortable: true},
				{key: "descripcion", sortable: true},
				{key: "prioridad", sortable: true},
				{key: "persona_id", sortable: true},
				{key: "categoria_id", sortable: true},
				{key: "actions", label: "Acciones"},
			],
		};
	},
	computed: {
		...mapState(["tickets", "loading"]),
	},
	methods: {
		...mapActions(["listarTickets", "eliminarTicket", "editarTicket"]),
		onCambiarEstatus(item) {
			this.$router.push({
				name: "CambiarEstatus",
				params: {
					id: item.item.id,
				},
			});
		},
		onEditar(item) {
			this.$router.push({
				name: "EditarTicket",
				params: {
					id: item.item.id,
				},
			});
		},
		onEliminar(item) {
			this.$bvModal
				.msgBoxConfirm("Esta opción no se puede deshacer.", {
					title: "Eliminar Ticket",
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
						this.eliminarTicket({
							id: item.item.id,
							onComplete: (response) => {
								this.$notify({
									type: "success",
									title: response.data.mensaje,
								});
								this.listarTickets();
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
		this.listarTickets();
	},
};
</script>
