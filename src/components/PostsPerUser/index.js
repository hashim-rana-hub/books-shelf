import { useEffect, useState } from "react";
import { getuserPost } from "../../api";
import { useParams } from "react-router-dom";
import Comments from "../Comments";
import Header from "../header";

const Post = ({ data, setData }) => {
	const setPostHandler = (post, index) => {
		const tempObj = post;
		const newObj = { ...tempObj, seeComments: true };
		let newArray = [...data];
		newArray[index] = { ...newObj };
		setData(newArray);
	};

	return (
		<Header isLoading={data ? false : true}>
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
		</Header>
	);
};

const PostsPerUser = ({ setIsLoading }) => {
	const [data, setData] = useState();
	const { userId } = useParams();

	const fetchPosts = async () => {
		try {
			setIsLoading(true);
			const data = await getuserPost();
			const userPosts = data?.filter(
				(post) => post?.userId === parseInt(userId)
			);
			setData(
				userPosts?.map((item) => ({
					...item,
					seeComments: false,
				}))
			);
			setIsLoading(false);
		} catch (error) {
			console.log("error from post per page ", error.message);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div className="posts">
			<Post data={data} setData={setData} setIsLoading={setIsLoading} />
		</div>
	);
};

export default PostsPerUser;
