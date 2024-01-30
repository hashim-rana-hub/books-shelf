import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";

function Header({ children, isLoading }) {
	return (
		<>
			<div className="header">
				<div className="logo"></div>
				<nav className="links">
					<ul>
						<li>
							<Link to={"/users"}>Users</Link>
						</li>
						<li>
							<Link to={"/posts"}>Posts</Link>
						</li>{" "}
						<li>
							<Link>About</Link>
						</li>
					</ul>
				</nav>
			</div>
			{isLoading && <Loader />}
			{children}
		</>
	);
}

export default Header;
