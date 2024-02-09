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
	const [fetchAgain, setFetchAgain] = useState(true);

	return (
		<userContext.Provider
			value={{ userData, setUserData, fetchAgain, setFetchAgain }}
		>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/posts/:userId" element={<PostsPerUser />} />
					<Route path="/users" element={<Users />} />
					<Route path="/edit-user/:userId" element={<EditUser />} />

					<Route path="/edit-post/:postId" element={<EditPost />} />
					<Route path="/posts" element={<Posts />} />
				</Routes>
			</BrowserRouter>
		</userContext.Provider>
	);
}

export default App;
