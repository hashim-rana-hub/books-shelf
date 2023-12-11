import { useEffect, useState } from "react";
import { getCommentsPerPost } from "../../api";

const Comments = ({ postId }) => {
	const [comments, setComments] = useState();
	const fetchComments = async () => {
		const data = await getCommentsPerPost(postId);
		setComments(data);
	};
	useEffect(() => {
		fetchComments();
	}, [postId]);
	return (
		<div className="commentWrapper">
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
