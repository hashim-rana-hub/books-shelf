import React, { useContext, useEffect, useState } from "react";
import { getUsers } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";

const Users = () => {
	const navigate = useNavigate();

	const { data, setData } = useContext(userContext);

	const handleEditUser = (user) => {
		navigate(`/edit-user/${user?.id}`, { state: { user } });
	};

	const handleDeleteUser = (user) => {
		let tempData = [...data];
		let filteredUsers = tempData?.filter((item) => item?.id !== user?.id);
		setData(filteredUsers);
	};

	return (
		<div className="usersList">
			{data?.map((user) => (
				<div key={user?.id} className="userCard">
					<div>
						<button onClick={() => handleEditUser(user)}>Edit</button>
						<button onClick={() => handleDeleteUser(user)}>Delete</button>
					</div>
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
