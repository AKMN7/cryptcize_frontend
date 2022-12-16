import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    state() {
        return {
            top100: [],
            top10: [],
            overview: {},
            btcMC: [],
            fearAndGreed: {},
            trending: [],
            favs: [],
            reacts: []
        }
    },
    mutations,
    actions,
    getters
};