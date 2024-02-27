import axios from "axios";

export const getBookList = async ({ signal }) => {
	try {
		const response = await axios.get(
			"https://api.nytimes.com/svc/books/v3/lists/full-overview.json",
			{
				params: {
					"api-key": "wzJhZX08fB0StJslRDz1nkcIgRG3qgQo",
				},
				signal,
			}
		);

		return response.data;
	} catch (error) {
		console.error("API Error:", error.message);
		throw error;
	}
};
export const getuserPost = async (signal) => {
	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/`,
			{ signal }
		);
		return response?.data;
	} catch (error) {
		console.log("error from posts ", error);
		throw error;
	}
};

export const getUsers = async (signal, params) => {
	try {
		const data = await axios.get(
			`https://jsonplaceholder.typicode.com/users/${
				!!params ? `?username=${params}` : ""
			}`,
			{ signal }
		);
		return data?.data;
	} catch (error) {
		console.log("error from users ", error?.message);
		throw error;
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

export const getPaginatedPosts = async (page, title, signal) => {
	try {
		let POST_BASE_URL = `https://jsonplaceholder.typicode.com/posts/?${
			page ? `_page=${page}` : ""
		}${title ? `&title=${title}` : ``}`;

		const response = await axios.get(POST_BASE_URL, { signal });

		return response?.data;
	} catch (error) {
		throw error;
	}
};
