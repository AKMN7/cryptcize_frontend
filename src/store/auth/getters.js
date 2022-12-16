export default {
    user(state) {
        return {
            email: state.email,
            name: state.name,
            age: state.age,
            country: state.country
        }
    },
    token(state) {
        return state.token
    },
    isAuthenticated(state) {
        return !!state.token
    }
};