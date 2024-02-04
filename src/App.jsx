import Header from "./components/header";
import "./styles/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import EditPost from "./components/EditPost";
import EditUser from "./components/EditUser";
import { createContext, useEffect, useState } from "react";
import PostsPerUser from "./components/PostsPerUser";
import Posts from "./components/Posts/Posts";
import Users from "./components/Users";
import { getUsers } from "./api";

export const userContext = createContext(null);

function App() {
	const [userData, setUserData] = useState(null);
	const [searched, setSearched] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(false);

	// const fetchUsers = async () => {
	// 	try {
	// 		const data = await getUsers(searched);
	// 		setUserData(data);
	// 		setIsLoading(false);
	// 	} catch (error) {
	// 		setErrorMessage(true);
	// 		console.log("error ", errorMessage, error);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchUsers();
	// }, [searched]);

	return (
		<userContext.Provider value={{ userData, setUserData }}>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path="/"
						element={
							<Home
								setIsLoading={setIsLoading}
								errorMessage={errorMessage}
								setErrorMessage={setErrorMessage}
							/>
						}
					/>
					<Route
						path="/users"
						element={
							<Users
								searched={searched}
								setSearched={setSearched}
								setIsLoading={setIsLoading}
								errorMessage={errorMessage}
								setErrorMessage={setErrorMessage}
							/>
						}
					/>
					<Route
						path="/posts/:userId"
						element={
							<PostsPerUser setIsLoading={setIsLoading} isLoading={isLoading} />
						}
					/>
					<Route path="/edit-user/:userId" element={<EditUser />} />

					<Route path="/edit-post/:postId" element={<EditPost />} />
					<Route
						path="/posts"
						element={
							<Posts
								searched={searched}
								setSearched={setSearched}
								errorMessage={errorMessage}
								setErrorMessage={setErrorMessage}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</userContext.Provider>
	);
}

export default App;
