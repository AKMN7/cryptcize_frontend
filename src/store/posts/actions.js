//import axios from "axios";

import axios from "axios";

export default {
	// Publish user's new Post
	async addPost(context, payload) {
		// JWT Token (Session Token)
		const token = context.rootGetters.token;

		// API Endpoint to add a post
		const endPoint = "https://cooperative-deer-overalls.cyclic.app/api/v1/posts/addPost";

		// Post Data
		const data = {
			coinName: payload.coinName,
			postType: payload.postType,
			text: payload.text,
		};

		// Send HTTP Request
		await axios.post(endPoint, data, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
			throw new Error(error.response.data.msg);
		});
	},

	// Get All Posts for a specific coin
	async getCoinPosts(context, payload) {
		// JWT Token (Session Token)
		const token = context.rootGetters.token;

		// API Endpoint to add a post
		const endPoint = `https://cooperative-deer-overalls.cyclic.app/api/v1/posts/coinPosts/${payload}`;

		const response = await axios.get(endPoint, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
			throw new Error(error.response.data.msg);
		});

		return response.data.data.coinPosts.reverse();
	},

	// Get All Posts for all coins
	async getAllCoinPosts(context) {
		// JWT Token (Session Token)
		const token = context.rootGetters.token;

		// API Endpoint to add a post
		const endPoint = `https://cooperative-deer-overalls.cyclic.app/api/v1/posts/`;

		const response = await axios.get(endPoint, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
			throw new Error(error.response.data.msg);
		});

		return response.data.data.posts.reverse();
	},

	// Get All Posts for a specific user
	async getAllUserPosts(context) {
		// JWT Token (Session Token)
		const token = context.rootGetters.token;

		// API Endpoint to add a post
		const endPoint = `https://cooperative-deer-overalls.cyclic.app/api/v1/posts/userPosts`;

		const response = await axios.get(endPoint, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
			throw new Error(error.response.data.msg);
		});

		return response.data.data.posts.reverse();
	},

	// Get the top 7 liked coins
	async getTop7Likes(context) {
		// JWT Token (Session Token)
		const token = context.rootGetters.token;

		// API Endpoint to add a post
		const endPoint = `https://cooperative-deer-overalls.cyclic.app/api/v1/main/getTopFavs`;

		const response = await axios.get(endPoint, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
			throw new Error(error.response.data.msg);
		});

		return response.data.data.topFavs;
	},

	// Get the top topics
	async getTopTopics(context) {
		// JWT Token (Session Token)
		const token = context.rootGetters.token;

		// API Endpoint to add a post
		const endPoint = `https://cooperative-deer-overalls.cyclic.app/api/v1/topics/getTopTopics`;

		const response = await axios.get(endPoint, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
			throw new Error(error.response.data.msg);
		});

		return response.data.data.topics;
	},

	// Publish user's new Post
	async createTopic(context, payload) {
		// JWT Token (Session Token)
		const token = context.rootGetters.token;

		// API Endpoint to add a post
		const endPoint = "https://cooperative-deer-overalls.cyclic.app/api/v1/topics/createTopic";

		// Post Data
		const data = {
			topicName: payload.topicName,
		};

		// Send HTTP Request
		const response = await axios
			.post(endPoint, data, { headers: { Authorization: `Bearer ${token}` } })
			.catch(function (error) {
				throw new Error(error.response.data.msg);
			});

		return response.data.data.topic;
	},

	// Get a specific topic info
	async getTopicInfo(context, payload) {
		console.log("GETING TOPIC INFO");

		// User's JWT (session token)
		const token = context.rootGetters.token;

		// Topic Info API Endpoint
		const topicInfoEndPoint = `https://cooperative-deer-overalls.cyclic.app/api/v1/topics/searchTopic`;

		// Extract Data
		let data = {
			toSearchForm: payload.topicCredentials,
		};

		// Get the topic Info
		const topicInfoResponse = await axios
			.post(topicInfoEndPoint, data, { headers: { Authorization: `Bearer ${token}` } })
			.catch((error) => {
				console.log("*** ERROR 1 ***", error);
				throw new Error("Something went wrong while fetching data, Please try again later.");
			});

		return topicInfoResponse.data.data;
	},

	// Get a specific topic comments
	async getTopicComments(context, payload) {
		// User's JWT (session token)
		const token = context.rootGetters.token;

		// Topic Comments API Endpoint
		const topicCommentsEndPoint = `https://cooperative-deer-overalls.cyclic.app/api/v1/topics/getComments/${payload}`;

		// Get the topic Comments
		const topicCommentsResponse = await axios
			.get(topicCommentsEndPoint, { headers: { Authorization: `Bearer ${token}` } })
			.catch((error) => {
				console.log("*** ERROR 1 ***", error);
				throw new Error("Something went wrong while fetching data, Please try again later.");
			});

		return topicCommentsResponse.data.data.comments;
	},

	// Publish user's new Comment on a specific topic
	async addComment(context, payload) {
		// JWT Token (Session Token)
		const token = context.rootGetters.token;

		// API Endpoint to add a post
		const endPoint = `https://cooperative-deer-overalls.cyclic.app/api/v1/topics/addComment/${payload.topicID}`;

		// Send HTTP Request
		await axios
			.post(endPoint, { text: payload.text }, { headers: { Authorization: `Bearer ${token}` } })
			.catch(function (error) {
				throw new Error(error.response.data.msg);
			});
	},
};
