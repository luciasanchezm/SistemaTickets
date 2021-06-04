<template>
	<div class="mb-3 row">
		<label class="col-sm-2 col-form-label text-start" :for="id">{{ titulo }}</label>
		<div class="col-sm-10">
			<b-form-select
				class="form-control"
				:value="value"
				:id="id"
				:options="options"
				@change="change"
			>
			</b-form-select>
		</div>
		<span v-if="error" class="text-danger">{{ mensajeError }}</span>
	</div>
</template>

<script>
export default {
	name: "Select",
	props: {
		id: {
			type: [String, Number],
			required: true,
		},
		change: Function,
		titulo: String,
		value: [String, Number],
		mensajeError: {
			type: String,
			default: "Campo obligatorio",
		},
		error: {
			type: Boolean,
			default: false,
		},
		options: Array,
	},
};
</script>
