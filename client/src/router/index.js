import Vue from "vue";
import VueRouter from "vue-router";
import CategoriasPage from "../views/categorias/CategoriasPage";
import AgregarCategoria from "../views/categorias/AgregarCategoria";
import PersonalPage from "../views/personal/PersonalPage";
import AgregarPersona from "../views/personal/AgregarPersona";
import EditarPersona from "../views/personal/EditarPersona";

Vue.use(VueRouter);

const routes = [
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
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
