<template>
	<div>
		<b-table
			show-empty
			:empty-text="emptyText"
			hover
			:busy="busy"
			:items="items"
			:fields="fields"
		>
			<template #table-busy>
				<div class="text-center text-danger my-2">
					<b-spinner class="align-middle"></b-spinner>
					<strong>Loading...</strong>
				</div>
			</template>

			<template #cell(actions)="data">
				<slot name="actions" :item="data"></slot>
			</template>
		</b-table>
	</div>
</template>

<script>
export default {
	name: "Table",
	props: {
		items: Array,
		fields: Array,
		busy: Boolean,
		emptyText: String,
	},
};
</script>

<style>
/* Para evitar textos muy largos */
td {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 100px;
}
</style>
