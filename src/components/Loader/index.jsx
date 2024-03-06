import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ isLoading, children, small = false }) => {
	return (
		<>
			{isLoading ? (
				<div className="overlay">
					<ClipLoader
						loading={isLoading}
						size={small ? 20 : 150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				children
			)}
		</>
	);
};

export default Loader;
