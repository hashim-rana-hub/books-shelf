import { useState, useEffect } from "react";
import { getPaginatedPosts } from "../../api";
import Comments from "../Comments";
import { getPages } from "../../utils/dataHelpers";
import _ from "lodash";
import Error from "../Error";
import Header from "../header";
import Loader from "../Loader";
import { useDebounce } from "../../hooks/useDebounce";

const Post = ({ data, setData }) => {
	const handleShowComments = (post, index) => {
		const posts = data?.map((item, i) => ({
			...item,
			seeComments: i === index ? !post?.seeComments : false,
		}));
		setData(posts);
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
	const [showPagination, setShowPagination] = useState(true);

	const fetchPosts = async (signal) => {
		try {
			const res = await getPaginatedPosts(seletedPage, searchedPost, signal);
			const filteredPost = res?.filter((post) =>
				post?.title?.includes(searchedPost)
			);

			setData(filteredPost);
			setShowPagination(!searchedPost ? true : false);
		} catch (error) {
			console.error("Error from posts: ", error);
		}
	};

	const debouncedSearch = useDebounce(searchedPost, 500);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		fetchPosts(signal);
		if (searchedPost) setSeletedPage(1);
		return () => controller.abort();
	}, [seletedPage, debouncedSearch]);

	return (
		<>
			<Header />
			<div className="searchWrapper">
				<input
					placeholder="search by title"
					value={searchedPost}
					onChange={(e) => {
						setSearchedPost(e.target.value);
						setShowPagination(false);
					}}
				/>
			</div>
			<Loader isLoading={data ? false : true}>
				<div
					className={`paginationWrapper 
					 ${data?.length === 0 ? "emptyList" : "postList"}`}
				>
					{data?.length === 0 && <Error message={" not found"} />}
					<Post data={data} setData={setData} />
				</div>

				{showPagination && !searchedPost && (
					<Pagination
						seletedPage={seletedPage}
						setSelectedPage={setSeletedPage}
					/>
				)}
			</Loader>
		</>
	);
};

export default Posts;
