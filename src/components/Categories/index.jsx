function Category({ category, activeFilter, activeFilterHandler }) {
	return (
		<div className="list">
			{category?.map((item) => (
				<div
					className={`listItem  ${
						activeFilter === item.list_name ? "activeFilter" : "inActiveFilter"
					}`}
					key={item?.list_id}
					onClick={() => activeFilterHandler(item)}
				>
					<p>{item?.list_name}</p>
				</div>
			))}
		</div>
	);
}

export default Category;
