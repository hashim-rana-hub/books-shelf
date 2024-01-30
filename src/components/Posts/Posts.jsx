import { useEffect, useState } from "react";
import { getPaginatedPosts } from "../../api";
import Comments from "../Comments";
import { getPages } from "../../utils/dataHelpers";
import _ from "lodash";
import Error from "../Error";
import Header from "../header";

const Post = ({ data, setData, errorMessage }) => {
	const [showComments, setShowComments] = useState(false);
	const handleShowComments = (post, index) => {
		const tempObj = post;
		const newObj = { ...tempObj, seeComments: true };
		const objWithTrueSeeComment = data.find((obj) => obj.seeComments === true);
		const tempArray = data?.map((post) => ({ ...post, seeComments: false }));
		console.log("first ", objWithTrueSeeComment);
		let newArray =
			objWithTrueSeeComment !== undefined ? [...tempArray] : [...data];
		newArray[index] = { ...newObj, seeComments: showComments ? false : true };
		setData(newArray);
		setShowComments((pre) => !pre);
		console.log("temparray ", tempArray);
	};

	return (
		<>
			{data?.map((post, index) => (
				<div className="post" key={post?.id}>
					<h3>{post.title}</h3>
					<p>{post?.body}</p>
					<button onClick={() => handleShowComments(post, index)}>
						{post?.seeComments ? "hide comments" : "see comments"}
					</button>
					{post?.seeComments ? <Comments postId={post?.id} /> : null}
				</div>
			))}
			{errorMessage && <Error message="no post found" />}
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

const Posts = ({ errorMessage, setErrorMessage }) => {
	const [data, setData] = useState();
	const [searchedPost, setSearchedPost] = useState("");
	const [seletedPage, setSeletedPage] = useState(1);

	const fetchPosts = async () => {
		try {
			const res = await getPaginatedPosts(seletedPage, searchedPost);

			if (searchedPost) {
				setSeletedPage(undefined);
				const filteredPost = res?.filter((post) =>
					post?.title?.includes(searchedPost)
				);
				setErrorMessage(filteredPost.length === 0);
				setData(filteredPost);
			} else {
				setSearchedPost("");
				setData(res);
				setErrorMessage(false);
				setSeletedPage(1);
			}
		} catch (error) {
			setErrorMessage(true);
			console.error("Error from posts: ", error);
		}
	};

	const handleSearchedPost = _.debounce((e) => {
		let value = e.target.value;
		setSearchedPost(value);
	}, 2000);

	useEffect(() => {
		fetchPosts();
	}, [seletedPage, searchedPost]);

	return (
		<Header isLoading={data ? false : true}>
			<div className="searchWrapper">
				<input placeholder="search by title" onChange={handleSearchedPost} />
			</div>
			<div
				className={`paginationWrapper ${
					errorMessage ? "emptyList" : "postList"
				}`}
			>
				<Post data={data} setData={setData} errorMessage={errorMessage} />
			</div>
			{!searchedPost && (
				<Pagination
					seletedPage={seletedPage}
					setSelectedPage={setSeletedPage}
				/>
			)}
		</Header>
	);
};

export default Posts;
