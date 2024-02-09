import { useRef, useState, useEffect, useContext } from "react";
import { getPaginatedPosts } from "../../api";
import Comments from "../Comments";
import { getPages } from "../../utils/dataHelpers";
import _ from "lodash";
import Error from "../Error";
import Header from "../header";
import { usePostListing } from "../../hooks/usePostListing";
import Loader from "../Loader";
import { useDebounce } from "../../hooks/useDebounce";

const Post = ({ data, setData, errorMessage }) => {
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
	const [errorMessage, setErrorMessage] = useState(false);
	const [showPagination, setShowPagination] = useState(true);

	const fetchPosts = async (signal) => {
		try {
			const res = await getPaginatedPosts(seletedPage, searchedPost, signal);

			if (searchedPost) {
				setSeletedPage(1);
				const filteredPost = res?.filter((post) =>
					post?.title?.includes(searchedPost)
				);
				setErrorMessage(filteredPost.length === 0);
				setData(filteredPost);
				setShowPagination(false);
			} else {
				setSearchedPost("");
				setShowPagination(true);
				setData(res);
				setErrorMessage(false);
			}
		} catch (error) {
			setErrorMessage(true);
			console.error("Error from posts: ", error);
		}
	};

	const debouncedSearch = useDebounce(searchedPost, 2000);

	// const { status, data, error, isFetching } = usePostListing(
	// 	seletedPage,
	// 	debouncedSearch,
	// 	setDataList
	// );

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		if (debouncedSearch || seletedPage) fetchPosts(signal);

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
						setSeletedPage(1);
					}}
				/>
			</div>
			<Loader isLoading={data ? false : true}>
				<div
					className={`paginationWrapper ${
						errorMessage ? "emptyList" : "postList"
					}`}
				>
					{errorMessage && <h2>not found</h2>}
					<Post data={data} setData={setData} errorMessage={errorMessage} />
					{/* <Post data={dataList} setData={setDataList} errorMessage={error} /> */}
				</div>

				{showPagination && (
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
