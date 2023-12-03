import { useState, useEffect } from "react";
import Category from "./components/Categories";
import List from "./components/List";
import Header from "./components/header";
import "./styles/styles.css";
import { getBookList } from "./api";

function App() {
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
	return (
		<div className="App">
			<Header />
			<Category
				category={data?.results?.lists}
				activeFilter={activeFilter}
				activeFilterHandler={activeFilterHandler}
			/>
			<List list={data?.results?.lists} activeFilter={activeFilter} />
		</div>
	);
}

export default App;
