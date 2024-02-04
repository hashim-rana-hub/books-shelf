import { useQuery } from "react-query";
import { getPaginatedPosts, getUsers, getuserPost } from "../api";

export function usePostListing(page, title, setDataList) {
	return useQuery({
		queryKey: ["posts-list", page, title],
		queryFn: () => getPaginatedPosts(page, title),
		enabled: true,
		onSuccess: (data) => {
			setDataList(data);
		},
	});
}

export function useUserPosts() {
	return useQuery({
		queryKey: ["user-post"],
		queryFn: () => getuserPost(),
		enabled: true,
	});
}
