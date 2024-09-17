import { useQuery } from "react-query";
import { getUsers } from "../api";
import { useContext } from "react";
import { userContext } from "../App";

export function useUsersList(searchedUser) {
	const { userData, setUserData, fetchApi } = useContext(userContext);
	console.log("fetch api ", fetchApi);
	return useQuery({
		queryKey: ["users-list", searchedUser],
		queryFn: () => getUsers(searchedUser),
		enabled: fetchApi,
		refetchOnWindowFocus: false,
		onSuccess: (data) => {
			setUserData(data);
		},
	});
}
