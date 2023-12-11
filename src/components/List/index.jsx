const List = ({ list, activeFilter }) => {
	return (
		<>
			{list?.map((item) =>
				item?.list_name === activeFilter ? (
					<div className="bookCard" key={item?.list_id}>
						{item?.books?.map((book) => (
							<div className="cardContent" key={book?.primary_isbn10}>
								<div
									className="bookImgWrapper"
									style={{
										height: " 500px",
										width: "700px",
									}}
								>
									<img src={book?.book_image} />
								</div>
								<div className="details">
									<h4>{book?.title}</h4>
									<p>{book?.description}</p>
									<p> {book?.contributor}</p>
									<p>Publiher {book?.publisher}</p>
									<span>Buy Links</span>
									<div>
										<h3>You can buy it from</h3>
										{book?.buy_links?.map((item) => (
											<a key={item?.url} href={item?.url}>
												{item?.name}
											</a>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				) : null
			)}
		</>
	);
};

export default List;
