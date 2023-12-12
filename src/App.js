import Header from "./components/header";
import "./styles/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Users from "./components/Users";
import EditPost from "./components/EditPost";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/posts/:userId" element={<Posts />} />
				<Route path="/users" element={<Users />} />
				<Route path="/edit-post/:postId" element={<EditPost />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
