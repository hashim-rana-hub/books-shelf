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

export const getUsers = async () => {
	try {
		const data = await axios.get("https://jsonplaceholder.typicode.com/users");
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

export const editUserPost = async (id) => {
	try {
		const response = await axios.put(
			`https://jsonplaceholder.typicode.com/posts/${id}`
		);
		// return response?.data;
	} catch (error) {
		console.log("error from posts ", error);
	}
};
