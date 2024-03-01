import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import Error from "../Error";

import Header from "../header";
import Loader from "../Loader";
import { useDebounce } from "../../hooks/useDebounce";
import { getUsers } from "../../api";
import { ADD_USER, EDIT_USER } from "../../utils/routeConstants";

const Users = () => {
	const navigate = useNavigate();
	let time = new Date();
	let id = `${time.getTime()}-${Math.floor(Math.random() * 1000)}`;

	const { userData, setUserData, fetchAgain, setFetchAgain } =
		useContext(userContext);

	const [searched, setSearched] = useState("");

	const debouncedSearch = useDebounce(searched, 2000);

	const handleEditUser = (user) => {
		navigate(`${EDIT_USER}${user?.id}`, {
			state: { user },
		});
	};

	const handleDeleteUser = (user) => {
		let tempData = [...userData];
		let filteredUsers = tempData?.filter((item) => item?.id !== user?.id);
		setUserData(filteredUsers);
	};
	const handleAddUser = () => {
		navigate(ADD_USER);
	};

	const fetchUsers = async (signal) => {
		try {
			const response = await getUsers(signal, searched);
			setUserData(response);
		} catch (error) {
			console.log("error from users ", error.message);
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		if (fetchAgain) fetchUsers(signal);

		return () => {
			controller.abort();
		};
	}, [debouncedSearch]);

	return (
		<>
			<Header />
			<div className="searchWrapper">
				<input
					placeholder="search by username"
					value={searched}
					onChange={(e) => {
						setSearched(e.target.value);
						setFetchAgain(true);
					}}
				/>
			</div>
			<div className="addUserWrapper">
				<button className="addUser" onClick={handleAddUser}>
					Add User
				</button>
			</div>
			<Loader>
				<div className="usersList">
					{userData?.length === 0 && (
						<Error message={"404 could not find any user"} />
					)}
					{userData?.map((user) => (
						<div key={user?.id} className="userCard">
							<div>
								<button onClick={() => handleEditUser(user)}>Edit</button>
								<button onClick={() => handleDeleteUser(user)}>Delete</button>
							</div>
							<h4>{user?.name}</h4>
							<h6>{user?.username}</h6>
							<p>
								{user?.address?.suite}
								{user?.address?.street}
								{user?.address?.city}
							</p>
							<h3>{user?.email}</h3>
							<strong>{user?.phone}</strong>
							<span>{user?.website}</span>
							<Link to={`/posts/${user?.id ?? id}`}>See posts</Link>
						</div>
					))}
				</div>
			</Loader>
		</>
	);
};

export default Users;
