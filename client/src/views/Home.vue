<template>
  <div class="home">
    <h1>Bienvenido a <b>TicketWeb</b></h1>
    <h3>Filtrar por:</h3>
    <div>
      <span>Categoría</span>
      <div class="d-flex justify-content-center">
        <div class="col-8">
          <b-form-select
            class="form-control"
            v-model="categoriaSeleccionada"
            id="categoria"
            @change="setCategoria"
            :options="categorias"
          ></b-form-select>
        </div>
      </div>
    </div>
    <b-card-group columns>
      <div class="m-3 col-3" v-for="ticket in tickets" v-bind:key="ticket.id">
        <transition name="fadeInUp" mode="out-in">
          <Card class="fadeInUp" :key="ticket.id" :ticket="ticket" />
        </transition>
      </div>
      <transition name="fadeInUp" mode="out-in">
        <div :key="'noinfo'" v-if="tickets.length === 0" class="mt-3">
          <b-alert show variant="info"
            >No hay tickets con la categoría seleccionada.</b-alert
          >
        </div>
      </transition>
    </b-card-group>
  </div>
</template>

<script>
import Card from "../components/Card";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: { Card },
  data() {
    return {
      categoriaSeleccionada: "-1",
    };
  },
  computed: {
    ...mapState(["tickets", "loading", "categorias", "personal"]),
  },
  methods: {
    ...mapActions(["filtrarTicketsPorCategoria", "listarCategoriasPorNombre"]),
    setCategoria(categoria) {
      this.categoriaSeleccionada = categoria;
      this.filtrarTicketsPorCategoria(categoria);
      //this.filteredTickets = this.tickets;
    },
  },
  created() {
    // El parámetro 'all' en true se usa para que, en lugar de tener por defecto "Seleccione una opción",
    // diga "Todas las categorías"
    this.listarCategoriasPorNombre({ all: true });
    // -1 hace referencia a todos los tickets (sin filtro)
    this.filtrarTicketsPorCategoria("-1");
  },
};
</script>

<style>
div.m-3 {
  display: inline-block;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  transition: 0.2s;
}

div.m-3:hover {
  transform: translateY(-6px);
  cursor: pointer;
}
</style>
