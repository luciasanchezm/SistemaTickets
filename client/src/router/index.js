import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/Home";

// ================== CATEGORIAS ========================
import CategoriasPage from "../views/categorias/CategoriasPage";
import AgregarCategoria from "../views/categorias/AgregarCategoria";

// ================== PERSONAL ========================
import PersonalPage from "../views/personal/PersonalPage";
import AgregarPersona from "../views/personal/AgregarPersona";
import EditarPersona from "../views/personal/EditarPersona";

// ================== TICKETS ========================
import TicketsPage from "../views/tickets/TicketsPage";
import AgregarTicket from "../views/tickets/AgregarTicket";
import EditarTicket from "../views/tickets/EditarTicket";
import CambiarEstatus from "../views/tickets/CambiarEstatus";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomePage,
	},
	// ================== CATEGORIAS ========================
	{
		path: "/categorias",
		name: "Categorias",
		component: CategoriasPage,
	},
	{
		path: "/categorias/agregar",
		name: "AgregarCategoria",
		component: AgregarCategoria,
	},
	// ================== PERSONAL ========================
	{
		path: "/personal",
		name: "PersonalPage",
		component: PersonalPage,
	},
	{
		path: "/personal/agregar",
		name: "AgregarPersona",
		component: AgregarPersona,
	},
	{
		path: "/personal/editar/:id",
		name: "EditarPersona",
		component: EditarPersona,
	},
	// ================== TICKETS ========================
	{
		path: "/tickets",
		name: "TicketsPage",
		component: TicketsPage,
	},
	{
		path: "/tickets/agregar",
		name: "AgregarTicket",
		component: AgregarTicket,
	},
	{
		path: "/tickets/editar/:id",
		name: "EditarTicket",
		component: EditarTicket,
	},
	{
		path: "/tickets/estatus/:id",
		name: "CambiarEstatus",
		component: CambiarEstatus,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
