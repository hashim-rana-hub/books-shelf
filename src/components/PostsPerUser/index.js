import { useEffect, useState } from "react";
import { getuserPost } from "../../api";
import { useParams } from "react-router-dom";
import Comments from "../Comments";
import Header from "../header";
import Loader from "../Loader";
import Error from "../Error";

const Post = ({ data, setData, loading }) => {
	const setPostHandler = (post, index) => {
		const tempObj = post;
		const newObj = { ...tempObj, seeComments: true };
		let newArray = [...data];
		newArray[index] = { ...newObj };
		setData(newArray);
	};

	return (
		<>
			<Header />
			<Loader isLoading={loading}>
				{data?.map((post, index) => (
					<div className="post" key={post?.id}>
						<h3>{post.title}</h3>
						<p>{post?.body}</p>
						<button onClick={() => setPostHandler(post, index)}>
							{post?.seeComments ? "hide comments" : "see comments"}
						</button>
						{post?.seeComments ? <Comments postId={post?.id} /> : null}
					</div>
				))}
				{data?.lenght === 0 && <Error message={"no posts yet"} />}
			</Loader>
		</>
	);
};

const PostsPerUser = () => {
	const [postsPerUser, setPostsPerUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const { userId } = useParams();

	const fetchPostsPerUser = async (signal) => {
		try {
			const result = await getuserPost(signal);
			const posts = result?.filter((post) => post?.userId === parseInt(userId));
			setPostsPerUser(posts ?? null);
			setLoading(false);
		} catch (error) {
			console.log("error from post per user ", error?.message);
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		fetchPostsPerUser(signal);
		return () => controller.abort();
	}, []);

	return (
		<div className="posts">
			<Post data={postsPerUser} setData={setPostsPerUser} loading={loading} />
		</div>
	);
};

export default PostsPerUser;
