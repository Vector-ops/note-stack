import PageNotFound from "@/views/PageNotFound.vue";
import SingleNotePage from "@/views/SingleNotePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/auth/login",
		name: "login",
		component: () => import("../views/LoginPage.vue"),
	},
	{
		path: "/auth/register",
		name: "register",
		component: () => import("../views/RegisterPage.vue"),
	},
	{
		path: "/note/:noteId",
		name: "note",
		component: SingleNotePage,
	},

	{
		path: "/:catchAll(.*)*",
		name: "PageNotFound",
		component: PageNotFound,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
