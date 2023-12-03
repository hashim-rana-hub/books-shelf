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
