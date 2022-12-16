export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.email = payload.email;
        state.name = payload.name;
        state.age = payload.age;
        state.country = payload.country;
    },
    updateUserPersonal(state, payload) {
        state.name = payload.name;
        state.age = payload.age;
        state.country = payload.country;
    }
};