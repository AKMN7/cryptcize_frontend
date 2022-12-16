import { createRouter, createWebHistory } from "vue-router";

import landing from "./pages/mainApp/TheLandingPage.vue";
import singIn from "./pages/authentication/signIn.vue";
import signUp from "./pages/authentication/signUp.vue";
import forgotPassword from "./pages/authentication/forgotPassword.vue";
import resetPassoword from "./pages/authentication/resetPassoword.vue";
import Application from "./pages/mainApp/TheApp.vue";
import Dashboard from "./components/dashboard/TheDashboard.vue";
import Explore from "./components/explore/TheExplore.vue";
import TheExploreMain from "./components/explore/main/TheExploreMain.vue";
import TheExploreChild from "./components/explore/child/TheExploreChild.vue";
// import TheFavourites from './components/favourites/TheFavourites.vue';
import Community from "./components/community/TheCommunity.vue";
import TheCommunityMain from "./components/community/main/TheCommunityMain.vue";
import TheTopic from "./components/community/topic/TheTopic.vue";
import TheOwnerProfile from "./components/profile/page/TheOwnerProfile.vue";
import TheViewerProfile from "./components/profile/page/TheViewerProfile.vue";
import TheProfileEdit from "./components/profile/edit/TheProfileEdit.vue";
import NotFound from "./pages/mainApp/TheNotFound.vue";

import store from "./store/index";

const router = createRouter({
	mode: "history",
	history: createWebHistory(),
	routes: [
		{ path: "/", component: landing },
		{ path: "/signin", component: singIn },
		{ path: "/signup", component: signUp },
		{ path: "/forgot", component: forgotPassword },
		{ path: "/reset/:token", component: resetPassoword },
		{
			path: "/app",
			component: Application,
			children: [
				{ path: "dashboard", component: Dashboard, meta: { requiresAuth: true } },
				{
					path: "explore",
					component: Explore,
					children: [
						{ path: "", component: TheExploreMain, meta: { requiresAuth: true } },
						{ path: ":coinID", component: TheExploreChild, meta: { requiresAuth: true } },
					],
				},
				{
					path: "community",
					component: Community,
					children: [
						{ path: "", component: TheCommunityMain, meta: { requiresAuth: true } },
						{ path: ":topicCode", component: TheTopic, meta: { requiresAuth: true } },
					],
				},
				{ path: "profile", component: TheOwnerProfile, meta: { requiresAuth: true } },
				{ path: "edit", component: TheProfileEdit, meta: { requiresAuth: true } },
				{ path: "users/:userID", component: TheViewerProfile, meta: { requiresAuth: true } },
				{ path: "/:notFound(.*)", component: NotFound },
				// { path: 'favs', component: TheFavourites, meta: { requiresAuth: true } },
			],
		},
	],
	scrollBehavior() {
		return { top: 0 };
	},
});

// Function called before the user enter each route (page)
router.beforeEach(function (to, _, next) {
	// Redirect user to sign in page if not authenticated
	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next("/signin");
	} else {
		next();
	}
});

export default router;
