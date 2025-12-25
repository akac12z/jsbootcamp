import { HomePage } from "../pages/Home";
import { SearchPage } from "../pages/Search";
import { NotFoundPage } from "../pages/404";


export const allPages = [
	{
		key: "home",
		path: "/",
		component: HomePage,
	},
	{
		key: "search",
		path: "/search",
		component: SearchPage,
	},
	{
		key: "notfound",
		path: "/notfound",
		component: NotFoundPage,
	},
];
