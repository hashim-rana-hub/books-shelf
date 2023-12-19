import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";

const Users = ({ searched, setSearched }) => {
	const navigate = useNavigate();

	const { userData, setUserData } = useContext(userContext);

	const handleEditUser = (user) => {
		navigate(`/edit-user/${user?.id}`, { state: { user } });
	};

	const handleDeleteUser = (user) => {
		let tempData = [...userData];
		let filteredUsers = tempData?.filter((item) => item?.id !== user?.id);
		setUserData(filteredUsers);
	};

	return (
		<>
			<div className="searchWrapper">
				<input
					placeholder="search by username"
					value={searched}
					onChange={(e) => setSearched(e.target.value)}
				/>
				{/* <button onClick={handleSearchUser}>Search</button> */}
			</div>
			<div className="usersList">
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
		</>
	);
};

export default Users;
