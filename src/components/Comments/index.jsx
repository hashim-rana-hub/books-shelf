import { useEffect, useState } from "react";
import { getCommentsPerPost } from "../../api";
import { ClipLoader } from "react-spinners";
import { useCommentsList } from "../../hooks/useComments";
import Loader from "../Loader";

const Comments = ({ postId }) => {
	const [comments, setComments] = useState();

	// const fetchComments = async () => {
	// 	try {
	// 		const res = await getCommentsPerPost(postId);
	// 		setComments(res);
	// 	} catch (err) {
	// 		console.error("Error fetching comments:", err);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchComments();
	// }, [postId]);
	const { status, data, error, isFetching } = useCommentsList(postId);

	return (
		<>
			<div className="commentWrapper">
				{isFetching && (
					<ClipLoader
						loading={comments ? false : true}
						size={50}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				)}
				{data?.map((item) => (
					<div key={item?.id} className="comments">
						<h5>{item?.email}</h5>
						<p>{item?.body}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default Comments;
