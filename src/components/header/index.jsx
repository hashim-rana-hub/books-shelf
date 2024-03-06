import React from "react";
import { Link } from "react-router-dom";
import { POSTS, USERS } from "../../utils/routeConstants";

function Header() {
	return (
		<>
			<div className="header">
				<div className="logo"></div>
				<nav className="links">
					<ul>
						<li>
							<Link to={USERS}>Users</Link>
						</li>
						<li>
							<Link to={POSTS}>Posts</Link>
						</li>{" "}
						<li>
							<Link>About</Link>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
}

export default Header;
