import Header from "./components/header";
import "./styles/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import EditPost from "./components/EditPost";
import EditUser from "./components/EditUser";
import { createContext, useEffect, useState } from "react";
import { getUsers } from "./api";
import PostsPerUser from "./components/PostsPerUser";
import Posts from "./components/Posts/Posts";
import Loader from "./components/Loader";

export const userContext = createContext(null);

function App() {
	const [userData, setUserData] = useState(null);
	const [searched, setSearched] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const fetchUsers = async () => {
		const data = await getUsers(searched);
		setUserData(data);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchUsers();
	}, [searched]);

	return (
		<userContext.Provider value={{ userData, setUserData }}>
			<BrowserRouter>
				<Header />
				{isLoading && <Loader isLoading={isLoading} />}
				<Routes>
					<Route
						exact
						path="/"
						element={<Home setIsLoading={setIsLoading} />}
					/>
					<Route
						path="/posts/:userId"
						element={
							<PostsPerUser setIsLoading={setIsLoading} isLoading={isLoading} />
						}
					/>
					<Route
						path="/users"
						element={<Users searched={searched} setSearched={setSearched} />}
					/>
					<Route path="/edit-user/:userId" element={<EditUser />} />

					<Route path="/edit-post/:postId" element={<EditPost />} />
					<Route path="/posts" element={<Posts />} />
				</Routes>
			</BrowserRouter>
		</userContext.Provider>
	);
}

export default App;
