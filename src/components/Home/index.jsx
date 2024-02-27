import React, { useEffect, useState } from "react";
import Category from "../Categories";
import List from "../List";
import { getBookList } from "../../api";
import Error from "../Error";
import Header from "../header";
import { useBooksList } from "../../hooks/useBookList";
import Loader from "../Loader";
import axios from "axios";

const Home = () => {
	const [data, setData] = useState();
	const [activeFilter, setActiveFilter] = useState();
	const [errorMessage, setErrorMessage] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const activeFilterHandler = (item) => setActiveFilter(item?.list_name);

	const fetchList = async (signal) => {
		try {
			setIsLoading(true);
			const results = await getBookList({ signal });
			if (results?.status === "OK") {
				setData(results?.results);
				setActiveFilter(results?.results.lists[0]?.list_name);
			}
		} catch (error) {
			if (!axios.isCancel(error)) {
				setErrorMessage(true);
				console.error("Component Error:", error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		fetchList(signal);

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<>
			<Header />
			<Loader isLoading={data ? false : true}>
				<Category
					category={data?.lists}
					activeFilter={activeFilter}
					activeFilterHandler={activeFilterHandler}
				/>
				<List list={data?.lists} activeFilter={activeFilter} />
				{errorMessage && <Error message={"404 could not find book list"} />}
			</Loader>
		</>
	);
};

export default Home;
