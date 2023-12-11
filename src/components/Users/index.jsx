import React, { useEffect, useState } from "react";
import { getUsers } from "../../api";
import { Link } from "react-router-dom";

const Users = () => {
	const [data, setData] = useState();
	const fetchUsers = async () => {
		const data = await getUsers();
		setData(data);
	};
	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className="usersList">
			{data?.map((user) => (
				<div key={user?.id} className="userCard">
					<h4>{user?.name}</h4>
					<p>
						{user?.address?.suite}
						{user?.address?.street}
						{user?.address?.city}
					</p>
					<h3>{user?.email}</h3>
					<strong>{user?.phone}</strong>
					<span>{user?.website}</span>
					<Link to={`/posts/${user?.id}`}>See posts</Link>
				</div>
			))}
		</div>
	);
};

export default Users;
