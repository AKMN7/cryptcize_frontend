import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    state() {
        return {
            token: null,
            email: null,
            name: null,
            age: null,
            country: null,
        }
    },
    mutations,
    actions,
    getters
};