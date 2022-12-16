import { createStore } from "vuex";

import authModule from "./auth/index";
import mainModule from "./main/index";
import postsModule from "./posts/index";
import darkTheme from "../configs/darkTheme";

const store = createStore({
    state() {
        return {
            headerText: "",
            isDarkTheme: darkTheme.isDarkTheme()
        }
    },
    getters: {
        headerText(state) {
            return state.headerText;
        },
        isDarkTheme(state) {
            return state.isDarkTheme
        }
    },
    mutations: {
        setHeaderText(state, payload) {
            state.headerText = payload;
        },
        toggleDarkTheme(state) {
            console.log('DARK THEME WAS', state.isDarkTheme);

            let result = localStorage.getItem("darkMode");
            if (result == 'true') {
                localStorage.setItem("darkMode", false);
                state.isDarkTheme = false;
                document.body.classList.remove("darkBody");
            } else {
                localStorage.setItem("darkMode", true);
                state.isDarkTheme = true;
                document.body.classList.add("darkBody");
            }

            console.log('DARK THEME NOW', state.isDarkTheme);
        },
        maintainTheme(state) {
            let result = localStorage.getItem("darkMode");
            if (result == 'true') {
                localStorage.setItem("darkMode", true);
                state.isDarkTheme = true;
                document.body.classList.add("darkBody");
            } else {
                localStorage.setItem("darkMode", false);
                state.isDarkTheme = false;
                document.body.classList.remove("darkBody");
            }

            console.log('DARK THEME NOW', state.isDarkTheme);
        }
    },
    modules: {
        auth: authModule,
        main: mainModule,
        posts: postsModule,
    }
});

export default store;