import { useEffect, useState } from "react";
import { getuserPost } from "../../api";
import { useParams } from "react-router-dom";
import Comments from "../Comments";
import Header from "../header";
import Loader from "../Loader";
import { useUserPosts } from "../../hooks/usePostListing";

const Post = ({ data, setData, error }) => {
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
			<Loader isLoading={data?.length > 0 ? false : true}>
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
			</Loader>
		</>
	);
};

const PostsPerUser = () => {
	const { status, data, error, isFetching } = useUserPosts();
	const [postsPerUser, setPostsPerUser] = useState(null);
	const { userId } = useParams();

	// useEffect(() => {
	// 	const userPosts = data?.filter((post) => post?.userId === parseInt(userId));
	// 	setPostsPerUser(
	// 		userPosts?.map((item) => ({
	// 			...item,
	// 			seeComments: false,
	// 		}))
	// 	);
	// 	console.log("posts per user ", postsPerUser, "status", status);
	// }, []);

	useEffect(() => {
		if (status === "success") {
			const userPosts = data.filter((post) => post.userId === parseInt(userId));
			setPostsPerUser(
				userPosts.map((item) => ({
					...item,
					seeComments: false,
				}))
			);
			console.log("posts per user ", postsPerUser);
		}
	}, [status]);

	return (
		<div className="posts">
			<Post data={postsPerUser} setData={setPostsPerUser} error={error} />
		</div>
	);
};

export default PostsPerUser;
