import React from "react";

const List = ({ list, activeFilter }) => {
	console.log("list ", list, "filter ", activeFilter);
	return (
		<>
			{list?.map((item) =>
				item?.list_name === activeFilter ? (
					<div className="bookCard" key={item?.list_id}>
						{item?.books?.map((book) => (
							<div className="cardContent">
								<div
									className="bookImgWrapper"
									style={{
										// height: book?.book_image_height,
										// width: book?.book_image_width,
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
											<a href={item?.url}>{item?.name}</a>
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
