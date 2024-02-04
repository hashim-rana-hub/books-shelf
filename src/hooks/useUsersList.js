import { useQuery } from "react-query";
import { getUsers } from "../api";
import { useContext } from "react";
import { userContext } from "../App";

export function useUsersList(searchedUser) {
	const { userData, setUserData } = useContext(userContext);
	return useQuery({
		queryKey: ["users-list", searchedUser],
		queryFn: () => getUsers(searchedUser),
		enabled: !userData || searchedUser ? true : false,
		onSuccess: (data) => setUserData(data),
	});
}
