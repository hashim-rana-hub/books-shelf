import { useEffect, useState } from "react";
import { getCommentsPerPost } from "../../api";
import { ClipLoader } from "react-spinners";

const Comments = ({ postId }) => {
	const [comments, setComments] = useState();

	const fetchComments = async () => {
		try {
			const res = await getCommentsPerPost(postId);
			setComments(res);
		} catch (err) {
			console.error("Error fetching comments:", err);
		}
	};

	useEffect(() => {
		fetchComments();
	}, [postId]);

	return (
		<div className="commentWrapper">
			{!comments && (
				<ClipLoader
					loading={comments ? false : true}
					size={50}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			)}
			{comments?.map((item) => (
				<div key={item?.id} className="comments">
					<h5>{item?.email}</h5>
					<p>{item?.body}</p>
				</div>
			))}
		</div>
	);
};

export default Comments;
