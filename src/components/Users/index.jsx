import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { getUsers } from "../../api";
import Error from "../Error";
import _ from "lodash";
import Header from "../header";

const Users = ({
	searched,
	setSearched,
	setIsLoading,
	errorMessage,
	setErrorMessage,
}) => {
	const navigate = useNavigate();

	const { userData, setUserData } = useContext(userContext);
	// ToDo:{ it is called in app.jsx because when i called this api here
	//and as after user navigates to usereslist after editing his profile
	// list got rerender and wipes out userData to its initial value}

	// const fetchUsers = () => {
	// 	getUsers(searched)
	// 		.then((res) => {
	// 			setIsLoading(false);
	// 			setUserData(res);
	// 		})
	// 		.catch((err) => {
	// 			setErrorMessage(true);
	// 			setIsLoading(false);
	// 		});
	// };

	// useEffect(() => {
	// 	fetchUsers();
	// }, [searched]);

	const handleEditUser = (user) => {
		navigate(`/edit-user/${user?.id}`, { state: { user } });
	};

	const handleDeleteUser = (user) => {
		let tempData = [...userData];
		let filteredUsers = tempData?.filter((item) => item?.id !== user?.id);
		setUserData(filteredUsers);
	};

	const handleTextChange = _.debounce((e) => {
		let value = e.target.value;
		setSearched(value);
	}, 2000);

	return (
		<Header isLoading={userData ? false : true}>
			<div className="searchWrapper">
				<input placeholder="search by username" onChange={handleTextChange} />
			</div>
			<div className="usersList">
				{errorMessage && <Error message={"404 could not find any user"} />}
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
						<Link to={`/posts/${user?.id}`}>See posts</Link>
					</div>
				))}
			</div>
		</Header>
	);
};

export default Users;
