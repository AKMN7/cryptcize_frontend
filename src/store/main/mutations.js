export default {
    setTop100(state, payload) {
        state.top100 = payload;
    },
    setTop10(state, payload) {
        state.top10 = payload;
    },
    setOverview(state, payload) {
        state.overview = payload;
    },
    setbtcMC(state, payload) {
        state.btcMC = payload;
    },
    setFearAndGreed(state, payload) {
        state.fearAndGreed = payload;
    },
    setTrending(state, payload) {
        state.trending = payload;
    },
    setFavs(state, payload) {
        state.favs = payload;
    },
    setReacts(state, payload) {
        state.reacts = payload;
    },
};