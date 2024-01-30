import { useEffect, useState } from "react";
import { getCommentsPerPost } from "../../api";
import Loader from "../Loader";

const Comments = ({ postId }) => {
	const [comments, setComments] = useState();
	const fetchComments = () => {
		getCommentsPerPost(postId)
			.then((res) => setComments(res))
			.then((err) => console.log("error from comments ", err));
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
