<template>
	<div class="mb-3 row">
		<label class="col-sm-2 col-form-label text-start" :for="id">{{ titulo }}</label>
		<div class="col-sm-10">
			<input
				:id="id"
				class="form-control input-lg"
				:value="value"
				:type="tipo"
				:maxlength="maxlength"
				:disabled="disabled"
				:placeholder="placeholder"
				@input="$emit('input', $event.target.value)"
			/>
		</div>
		<span v-if="error" class="text-danger">{{ mensajeError }}</span>
	</div>
</template>

<script>
export default {
	name: "Input",
	props: {
		id: {
			type: [String, Number],
			required: true,
		},
		titulo: String,
		value: [String, Number],
		tipo: {
			type: String,
			default: "text",
		},
		maxlength: {
			type: Number,
			default: 100,
		},

		disabled: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: "Ingresa la información",
		},
		mensajeError: {
			type: String,
			default: "Campo obligatorio",
		},
		error: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style></style>
