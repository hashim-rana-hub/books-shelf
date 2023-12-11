import React, { useEffect, useState } from "react";
import Category from "../Categories";
import List from "../List";
import { getBookList } from "../../api";

const Home = () => {
	const [data, setData] = useState();
	const [activeFilter, setActiveFilter] = useState();

	const activeFilterHandler = (item) => setActiveFilter(item?.list_name);

	const fetchList = async () => {
		try {
			const apiResponse = await getBookList();
			setData(apiResponse);
		} catch (error) {
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
		<div>
			<Category
				category={data?.results?.lists}
				activeFilter={activeFilter}
				activeFilterHandler={activeFilterHandler}
			/>
			<List list={data?.results?.lists} activeFilter={activeFilter} />
		</div>
	);
};

export default Home;
