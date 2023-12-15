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

export const userContext = createContext(null);

function App() {
	const [data, setData] = useState(null);
	const [searched, setSearched] = useState("");

	const fetchUsers = async () => {
		const data = await getUsers(searched);
		setData(data);
	};

	useEffect(() => {
		fetchUsers();
	}, [searched]);

	return (
		<userContext.Provider value={{ data, setData }}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/posts/:userId" element={<PostsPerUser />} />
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
