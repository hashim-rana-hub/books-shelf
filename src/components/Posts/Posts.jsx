import { useEffect, useState } from "react";
import { getPaginatedPosts } from "../../api";
import Comments from "../Comments";
import { getPages } from "../../utils/dataHelpers";

const Post = ({ data, setData }) => {
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

const Pagination = ({ seletedPage, setSelectedPage }) => {
	return (
		<div className="pagination">
			<div className="pages">
				{getPages?.map((item) => (
					<span
						key={item?.id}
						className="page"
						onClick={() => setSelectedPage(item?.page)}
						style={{
							background: seletedPage === item?.page ? "bisque" : "transparent",
						}}
					>
						{item?.page}
					</span>
				))}
			</div>
		</div>
	);
};

const Posts = () => {
	const [data, setData] = useState();
	const [searchedPost, setSearchedPost] = useState("");
	const [seletedPage, setSeletedPage] = useState(1);

	const fetchPosts = async () => {
		const data = await getPaginatedPosts(seletedPage, searchedPost);
		if (searchedPost) {
			setSeletedPage(undefined);
			const filteredPost = data?.filter((post) =>
				post?.title?.includes(searchedPost)
			);

			setData(filteredPost);
		} else setData(data);
	};

	const handleSearchedPost = (e) => {
		setSearchedPost(e.target.value);
	};

	useEffect(() => {
		fetchPosts();
	}, [seletedPage, searchedPost]);

	return (
		<>
			<div className="searchWrapper">
				<input
					placeholder="search by title"
					value={searchedPost}
					onChange={handleSearchedPost}
				/>
			</div>
			<div className="paginationWrapper">
				<Post data={data} setData={setData} />
			</div>
			<Pagination seletedPage={seletedPage} setSelectedPage={setSeletedPage} />
		</>
	);
};

export default Posts;
