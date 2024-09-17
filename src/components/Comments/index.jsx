import { useEffect, useState } from "react";
import { getCommentsPerPost } from "../../api";
import { ClipLoader } from "react-spinners";
import { useCommentsList } from "../../hooks/useComments";
import Loader from "../Loader";

const Comments = ({ postId }) => {
	const { status, data, error, isFetching } = useCommentsList(postId);

	return (
		<>
			<div className="commentWrapper">
				<Loader isLoading={isFetching} small>
					{data?.map((item) => (
						<div key={item?.id} className="comments">
							<h5>{item?.email}</h5>
							<p>{item?.body}</p>
						</div>
					))}
				</Loader>
			</div>
		</>
	);
};

export default Comments;
