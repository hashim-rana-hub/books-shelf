import React, { useEffect, useState } from "react";
import Category from "../Categories";
import List from "../List";
import { getBookList } from "../../api";
import Error from "../Error";
import Header from "../header";

const Home = ({ setIsLoading, errorMessage, setErrorMessage }) => {
	const [data, setData] = useState();
	const [activeFilter, setActiveFilter] = useState();

	const activeFilterHandler = (item) => setActiveFilter(item?.list_name);

	const fetchList = async () => {
		try {
			setIsLoading(true);
			const apiResponse = await getBookList();
			setData(apiResponse);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setErrorMessage(true);
			console.error("Component Error:", error.message);
		}
	};

	useEffect(() => {
		fetchList();
	}, []);

	useEffect(() => {
		setActiveFilter(data?.results?.lists[0]?.list_name);
	}, [data]);

	return (
		<Header isLoading={!data ? true : false}>
			<div>
				<Category
					category={data?.results?.lists}
					activeFilter={activeFilter}
					activeFilterHandler={activeFilterHandler}
				/>
				<List list={data?.results?.lists} activeFilter={activeFilter} />
				{errorMessage && <Error message={"404 could not find book list"} />}
			</div>
		</Header>
	);
};

export default Home;
