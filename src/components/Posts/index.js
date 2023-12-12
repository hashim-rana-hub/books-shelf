import { useEffect, useState } from "react";
import { getuserPost } from "../../api";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import Comments from "../Comments";

const Post = ({ data, setData }) => {
	const navigate = useNavigate();

	const setPostHandler = (post, index) => {
		const tempObj = post;
		const newObj = { ...tempObj, seeComments: true };
		let newArray = [...data];
		newArray[index] = { ...newObj };
		setData(newArray);
	};
	const handleEditPost = (post) => {
		navigate(`/edit-post/${post?.id}`, { state: { post } });
	};

	return (
		<>
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
		</>
	);
};

const Posts = () => {
	const [data, setData] = useState();

	const { userId } = useParams();

	const fetchPosts = async () => {
		const data = await getuserPost();
		const userPosts = data?.filter((post) => post?.userId === parseInt(userId));
		setData(
			userPosts?.map((item) => ({
				...item,
				seeComments: false,
			}))
		);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div className="posts">
			<Post data={data} setData={setData} />
		</div>
	);
};

export default Posts;
