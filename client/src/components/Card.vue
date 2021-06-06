<template>
  <b-card
    :bg-variant="
      ticket.estatus === 'ABT'
        ? 'danger'
        : ticket.estatus === 'ESP'
        ? 'success'
        : 'secondary'
    "
    border-variant="light"
    class="text-light"
    :header="ticket.nombre"
  >
    <b-card-text>{{ ticket.descripcion || "-" }}</b-card-text>
    <b-card-body
      >Prioridad:
      <b>{{
        ticket.prioridad === 1
          ? "BAJA"
          : ticket.prioridad === 2
          ? "MEDIA"
          : "ALTA"
      }}</b>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: "Select",
  props: {
    ticket: Object,
  },
};
</script>
