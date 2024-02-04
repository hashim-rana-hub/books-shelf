import React, { useEffect, useState } from "react";
import Category from "../Categories";
import List from "../List";
import { getBookList } from "../../api";
import Error from "../Error";
import Header from "../header";
import { useBooksList } from "../../hooks/useBookList";
import Loader from "../Loader";

const Home = ({ setIsLoading, errorMessage, setErrorMessage }) => {
	//	const [data, setData] = useState();
	const [activeFilter, setActiveFilter] = useState();

	const activeFilterHandler = (item) => setActiveFilter(item?.list_name);

	const { status, data, error, isFetching } = useBooksList();

	// const fetchList = async () => {
	// 	try {
	// 		// if (!data) {
	// 		setIsLoading(true);
	// 		const { results } = await getBookList();
	// 		setData(results);
	// 		setIsLoading(false);
	// 		// }
	// 	} catch (error) {
	// 		setIsLoading(false);
	// 		setErrorMessage(true);
	// 		console.error("Component Error:", error.message);
	// 	}
	// };

	useEffect(() => {
		setActiveFilter(data?.results?.lists[0]?.list_name);
	}, [data]);

	return (
		<>
			<Header />
			<Loader isLoading={data ? false : true}>
				<Category
					category={data?.results?.lists}
					activeFilter={activeFilter}
					activeFilterHandler={activeFilterHandler}
				/>
				<List list={data?.results?.lists} activeFilter={activeFilter} />
				{errorMessage && <Error message={"404 could not find book list"} />}
			</Loader>
		</>
	);
};

export default Home;
