import axios from "axios";

export default {
    // Get the application's Main info
    async getMainInfo(context) {

        console.log('GEETING MAIN INFO');

        // User's JWT (session token)
        const token = context.rootGetters.token;

        // Dashboard API Endpoint
        const dashEndPoint = "https://cryptcize.herokuapp.com/api/v1/main/dashboard";

        // Get User Likes
        const userLikesEndPoint = "https://cryptcize.herokuapp.com/api/v1/users/getLikes";

        // Get User Reacts (upvotes and downvots)
        const userReactsEndPoint = "https://cryptcize.herokuapp.com/api/v1/posts/allReacts"

        // Get user's likes Info
        const favsEndPoint = "https://cryptcize.herokuapp.com/api/v1/main/favourites";


        // Get the user Likes
        const userLikesResponse = await axios.get(userLikesEndPoint,
            { headers: { "Authorization": `Bearer ${token}` } }).catch((error) => {
                console.log('*** ERROR 1 ***', error);
                throw new Error("Something went wrong while fetching data, Please try again later.");
            });

        // Filter User Likes
        const userLikes = {
            favs: userLikesResponse.data.data.likes
        };


        // Get Dashboard and Favourites Info
        await Promise.all([
            axios.get(dashEndPoint, { headers: { "Authorization": `Bearer ${token}` } }),
            axios.post(favsEndPoint, userLikes, { headers: { "Authorization": `Bearer ${token}` } }),
            axios.get(userReactsEndPoint, { headers: { "Authorization": `Bearer ${token}` } })
        ]).then((response) => {

            const dashResponse = response[0].data.data;
            const favsResponse = response[1].data.data;
            const reactsResponse = response[2].data.data;

            // Save Info To Vuex (Make it visible to the application)
            context.commit("setTop100", dashResponse.coinsTop100List);
            context.commit("setTop10", dashResponse.coinsTop10List);
            context.commit("setOverview", dashResponse.global.overview);
            context.commit("setbtcMC", dashResponse.global.btcMC);
            context.commit("setFearAndGreed", dashResponse.fearAndGreed);
            context.commit("setTrending", dashResponse.topFour.trendingCoins);
            context.commit("setFavs", favsResponse.favArr);
            context.commit("setReacts", reactsResponse.reacts);

        }).catch((error) => {
            console.log('*** ERROR 2 ***', error);
            throw new Error("Something went wrong while fetching data, Please try again later.");
        });
    },


    // Get a specific coin info
    async getCoinInfo(context, payload) {

        console.log('GETING COIN INFO');

        // User's JWT (session token)
        const token = context.rootGetters.token;

        // Dashboard API Endpoint
        const coinInfoEndPoint = `https://cryptcize.herokuapp.com/api/v1/main/coininfo/${payload}`;

        // Get the user Likes
        const coinInfoResponse = await axios.get(coinInfoEndPoint,
            { headers: { "Authorization": `Bearer ${token}` } }).catch((error) => {
                console.log('*** ERROR 1 ***', error);
                throw new Error("Something went wrong while fetching data, Please try again later.");
            });

        return coinInfoResponse.data.data.coinInfo.coinData;
    },


    // Add Coin to user Favourites
    async addLike(context, payload) {

        // User's JWT (session token)
        const token = context.rootGetters.token;

        // Add Like API Endpoint
        const addLikeEndPoint = `https://cryptcize.herokuapp.com/api/v1/users/addLike/${payload.coinID}`;

        // Extract Coin Data To Send as API Body
        const data = {
            coinName: payload.coinName,
            coinSymbol: payload.coinSymbol
        };

        // Send HTTP Request
        await axios.post(addLikeEndPoint, data,
            { headers: { "Authorization": `Bearer ${token}` } }).catch((error) => {
                console.log('*** ERROR 1 ***', error);
                throw new Error("Something went wrong adding this coin to your favourites. Please Try Again Later");
            });


        // Update User Favs That Allows to update the UI instantly
        await context.dispatch("updateFavs");
    },


    // Remove Coin from user's Favourites
    async removeLike(context, payload) {

        // User's JWT (session token)
        const token = context.rootGetters.token;

        // Add Like API Endpoint
        const removeLikeEndPoint = `https://cryptcize.herokuapp.com/api/v1/users/removeLike/${payload.coinID}`;

        // Send HTTP Reques
        await axios.get(removeLikeEndPoint,
            { headers: { "Authorization": `Bearer ${token}` } }).catch((error) => {
                console.log('*** ERROR 1 ***', error);
                throw new Error("Something went wrong unfavoring this coin. Please Try Again Later!");
            });

        // Update User Favs That Allows to update the UI instantly
        await context.dispatch("updateFavs");
    },


    // Update User's Favourites
    async updateFavs(context) {

        // User's JWT (session token)
        const token = context.rootGetters.token;

        // Get User Likes
        const userLikesEndPoint = "https://cryptcize.herokuapp.com/api/v1/users/getLikes";

        // Get user's likes Info
        const favsEndPoint = "https://cryptcize.herokuapp.com/api/v1/main/favourites";


        // Get the user Likes
        const userLikesResponse = await axios.get(userLikesEndPoint,
            { headers: { "Authorization": `Bearer ${token}` } }).catch((error) => {
                console.log('*** ERROR 1 ***', error);
                throw new Error("Something Went Wrong Updateing Your Favourites!");
            });

        // Filter User Likes
        const userLikes = {
            favs: userLikesResponse.data.data.likes
        };


        // Retrive User's updated favourites info 
        await axios.post(favsEndPoint, userLikes,
            { headers: { "Authorization": `Bearer ${token}` } }).then((response) => {
                context.commit("setFavs", response.data.data.favArr);
            }).catch((error) => {
                console.log('*** ERROR 2 ***', error);
                throw new Error("Something Went Wrong Updateing Your Favourites!");
            });
    },


    // Get all the data of a specific user
    async getSpecificUserData(context, payload) {
        console.log('GETING SPECIFC USER INFO');

        // User's JWT (session token)
        const token = context.rootGetters.token;

        // Dashboard API Endpoint
        const userInfoEndPoint = `https://cryptcize.herokuapp.com/api/v1/main/getUser/${payload}`;

        // Get the user Likes
        const userInfo = await axios.get(userInfoEndPoint,
            { headers: { "Authorization": `Bearer ${token}` } }).catch((error) => {
                console.log('*** ERROR 1 ***', error);
                throw new Error("Something went wrong while fetching data, Please try again later.");
            });

        return userInfo.data.data;
    },


    // Add Coin to user Favourites
    async addReact(context, payload) {

        // User's JWT (session token)
        const token = context.rootGetters.token;

        // Add React API Endpoint
        const addReactEndPoint = `https://cryptcize.herokuapp.com/api/v1/posts/addReact/${payload.postID}`;

        // Extract React Data To Send as API Body
        const data = {
            reactType: payload.reactType,
        };

        // Send HTTP Request
        await axios.post(addReactEndPoint, data,
            { headers: { "Authorization": `Bearer ${token}` } }).catch((error) => {
                console.log('*** ERROR 1 ***', error);
                throw new Error("Something went wrong reacting to this post. Please Try Again Later");
            });

        // Update User Reacts That Allows to update the UI instantly
        await context.dispatch("updateReacts");
    },

    // Update User's Reacts
    async updateReacts(context) {

        // User's JWT (session token)
        const token = context.rootGetters.token;

        // Get User Reacts (upvotes and downvots)
        const userReactsEndPoint = "https://cryptcize.herokuapp.com/api/v1/posts/allReacts"

        // Retrive User's updated reacts info 
        await axios.get(userReactsEndPoint, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                context.commit("setReacts", response.data.data.reacts);
            }).catch((error) => {
                console.log('*** ERROR 2 ***', error);
                throw new Error("Something Went Wrong Updateing Your Reacts!");
            });
    },
};