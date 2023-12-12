import Header from "./components/header";
import "./styles/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Users from "./components/Users";
import EditPost from "./components/EditPost";
import EditUser from "./components/EditUser";
import { createContext, useEffect, useState } from "react";
import { getUsers } from "./api";

export const userContext = createContext(null);

function App() {
	const [data, setData] = useState(null);
	const fetchUsers = async () => {
		const data = await getUsers();
		setData(data);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<userContext.Provider value={{ data, setData }}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/posts/:userId" element={<Posts />} />
					<Route path="/users" element={<Users />} />
					<Route path="/edit-user/:userId" element={<EditUser />} />

					<Route path="/edit-post/:postId" element={<EditPost />} />
				</Routes>
			</BrowserRouter>
		</userContext.Provider>
	);
}

export default App;
