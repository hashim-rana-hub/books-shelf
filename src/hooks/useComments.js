import { useQuery } from "react-query";
import { getCommentsPerPost } from "../api";

export function useCommentsList(postId) {
	return useQuery({
		queryKey: ["comments", postId],
		queryFn: () => getCommentsPerPost(postId),
		enabled: true,
	});
}
