import { createApp } from 'vue'
import VueTippy from "vue-tippy";
import VueSweetalert2 from "vue-sweetalert2";
// Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
// Tippy
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/animations/scale.css";
// Sweet Alert 2
import 'sweetalert2/dist/sweetalert2.min.css';
// Main
import './styling/style.css';
// App
import App from './App.vue';
import router from './router';
import store from './store/index';

const app = createApp(App);

app.use(
    VueTippy,
    {
        directive: 'tippy',
        component: 'tippy',
        defaultProps: {
            placement: 'top',
            theme: 'light-border',
            animation: 'scale',
            fontfamily: 'Lato'
        },
    }
);

app.use(VueSweetalert2);

app.use(router);
app.use(store);

app.mount('#app');