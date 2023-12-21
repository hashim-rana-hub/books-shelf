import axios from "axios";

export const getBookList = async () => {
	try {
		const response = await axios.get(
			"https://api.nytimes.com/svc/books/v3/lists/full-overview.json",
			{
				params: {
					"api-key": "wzJhZX08fB0StJslRDz1nkcIgRG3qgQo",
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("API Error:", error.message);
		throw error;
	}
};

export const getuserPost = async () => {
	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/`
		);
		return response?.data;
	} catch (error) {
		console.log("error from posts ", error);
	}
};

export const getUsers = async (params) => {
	try {
		const data = await axios.get(
			`https://jsonplaceholder.typicode.com/users/${
				!!params ? `?username=${params}` : ""
			}`
		);

		return data?.data;
	} catch (error) {
		console.log("error from posts ", error);
	}
};

export const getCommentsPerPost = async (id) => {
	try {
		const data = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/${id}/comments/`
		);
		return data?.data;
	} catch (error) {
		console.log("error from comments ", error);
	}
};

export const editUserPost = async (id, values) => {
	try {
		return await axios.patch(
			`https://jsonplaceholder.typicode.com/posts/${id}`,
			{
				title: values.title,
				body: values.body,
			}
		);
	} catch (error) {
		console.log("error from posts ", error);
	}
};

export const getPaginatedPosts = async (params) => {
	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/?_page=${params}`
		);
		return response?.data;
	} catch (error) {
		console.log("error from posts ", error);
	}
};
