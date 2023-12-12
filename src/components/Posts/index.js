import { useEffect, useState } from "react";
import { getuserPost } from "../../api";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import Comments from "../Comments";

const Post = ({ data, setData, handleEditPost }) => {
	const setPostHandler = (post, index) => {
		const tempObj = post;
		const newObj = { ...tempObj, seeComments: true };
		let newArray = [...data];
		newArray[index] = { ...newObj };
		setData(newArray);
	};

	return (
		<>
			{data?.map((post, index) => (
				<div className="post" key={post?.id}>
					<div className="editSection">
						<button onClick={() => handleEditPost(post, index)}>edit</button>{" "}
						<button>delete</button>
					</div>

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
	const navigate = useNavigate();

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

	const handleEditPost = (post) => {
		navigate(`/edit-post/${post?.id}`, { state: { post } });
	};

	useEffect(() => {
		fetchPosts();
	}, [handleEditPost]);

	return (
		<div className="posts">
			<Post data={data} setData={setData} handleEditPost={handleEditPost} />
		</div>
	);
};

export default Posts;
