import axios from "axios";

// eslint-disable-next-line
let timer;
// const period = 150000;
const period = 720000; // 12min

export default {

    // Sign In Functionality
    async signIn(context, payload) {

        // API EndPoint
        const endPoint = "https://cryptcize.herokuapp.com/api/v1/users/signin";

        const data = {
            email: payload.email,
            password: payload.password
        };

        // Send HTTP Request 
        const response = await axios.post(endPoint, data);

        // If Unauthorized, Stop and Throw Error
        if (response.status !== 201) throw new Error("Invalid Credentials!");

        // Retrieve User Info
        const token = response.data.token;
        const userData = response.data.data.user;

        // Save Token To Local Storage if the user wants to keep signed In
        if (payload.keepSignedIn === true) {
            localStorage.setItem('token', token);
            localStorage.setItem('keepSignedIn', true);
            localStorage.setItem('email', userData.email);
            localStorage.setItem('name', userData.name);
            localStorage.setItem('age', userData.age);
            localStorage.setItem('country', userData.country);
        }

        // Set User
        context.commit('setUser', {
            token: token,
            email: userData.email,
            name: userData.name,
            age: userData.age,
            country: userData.country
        });

        await context.dispatch('getMainInfo');

        timer = setInterval(async () => {
            console.log('Calling Interval');
            await context.dispatch('getMainInfo');
        }, period);

    },

    // Sing In User Instan
    autoSignIn(context) {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const name = localStorage.getItem('name');
        const age = localStorage.getItem('age');
        const country = localStorage.getItem('country');
        const keepSignedIn = localStorage.getItem('keepSignedIn');

        let userFound = false;

        if (token && keepSignedIn === "true") {

            // SET USER IN VUEX
            context.commit('setUser', {
                token,
                email,
                name,
                age,
                country
            });

            userFound = true;

            timer = setInterval(async () => {
                console.log('Calling Interval', period);
                await context.dispatch('getMainInfo');
            }, period);
        }

        return userFound;
    },

    // Sign Up Functionality
    async signUp(context, payload) {
        // API EndPoint
        const endPoint = "https://cryptcize.herokuapp.com/api/v1/users/signup";

        const data = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            passwordConfirm: payload.passwordConfirm
        };

        // Send HTTP Request 
        const response = await axios.post(endPoint, data).catch(function (error) {
            // console.log(error);
            throw new Error(error.response.data.msg);
        });

        // Retrieve User Info
        const token = response.data.token;
        const userData = response.data.data.user;

        // Set User
        context.commit('setUser', {
            token: token,
            email: userData.email,
            name: userData.name,
            age: userData.age,
            country: userData.country
        });

        await context.dispatch('getMainInfo');

        timer = setInterval(async () => {
            console.log('Calling Interval', period);
            await context.dispatch('getMainInfo');
        }, period);
    },


    // Log User Out
    logout(context) {
        // Save Token To Local Storage
        localStorage.removeItem('token');
        localStorage.removeItem('keepSignedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('age');
        localStorage.removeItem('country');

        // Remove User Data from LocalStorage
        context.commit('setUser', {
            token: null,
            email: null,
            name: null,
            age: null,
            country: null
        });

        clearInterval(timer);
    },


    // Update User's Personal Details
    async updatePersonal(context, payload) {
        // JWT Token
        const token = context.rootGetters.token;

        // API Endpoint To update user's personal details
        const endPoint = "https://cryptcize.herokuapp.com/api/v1/users/updatePersonal";

        // New Data
        const data = {
            name: payload.name,
            age: payload.age,
            country: payload.country
        };

        // Send HTTP Reques
        const response = await axios.patch(endPoint, data, { headers: { "Authorization": `Bearer ${token}` } }).catch(function (error) {
            throw new Error(error.response.data.msg);
        });

        // Get if the user decided to be rememberd in the next visit
        const keepSignedIn = localStorage.getItem('keepSignedIn');

        // Only Assign personal Data is the user want to be logged in
        if (keepSignedIn === "true") {
            localStorage.setItem('name', response.data.data.user.name);
            localStorage.setItem('age', response.data.data.user.age);
            localStorage.setItem('country', response.data.data.user.country);
        }

        // Update Application State Managment (Vuex)
        context.commit('updateUserPersonal', {
            name: response.data.data.user.name,
            age: response.data.data.user.age,
            country: response.data.data.user.country
        });
    },


    // Update User's Security Details (password)
    async updateSecurity(context, payload) {
        // JWT Token
        const token = context.rootGetters.token;

        // API Endpoint To update user's personal details
        const endPoint = "https://cryptcize.herokuapp.com/api/v1/users/updatePassword";

        // New Data
        const data = {
            currentPassword: payload.currentPassword,
            password: payload.password,
            passwordConfirm: payload.passwordConfirm
        };

        // Send HTTP Request
        await axios.patch(endPoint, data, { headers: { "Authorization": `Bearer ${token}` } }).catch(function (error) {
            throw new Error(error.response.data.msg);
        });
    },


    // Send Email to user with reset password link
    async forgotPassword(_, payload) {

        // API Endpoint To update user's personal details
        const endPoint = "https://cryptcize.herokuapp.com/api/v1/users/forgotPassword";

        // New Data
        const data = {
            email: payload.email
        };

        // Send HTTP Reques
        await axios.post(endPoint, data).catch(function (error) {
            throw new Error(error.response.data.msg);
        });
    },


    // Reste User's Password Using Reset Link
    async resetPassword(_, payload) {

        console.log('RESETING PASSWORD ...');

        // API Endpoint To reset user's password
        const endPoint = `https://cryptcize.herokuapp.com/api/v1/users/resetPassword/${payload.resetToken}`;

        // New Data
        const data = {
            password: payload.password,
            passwordConfirm: payload.passwordConfirm
        };

        // Send HTTP Reques
        await axios.patch(endPoint, data).catch(function (error) {
            throw new Error(error.response.data.msg);
        });
    }

};