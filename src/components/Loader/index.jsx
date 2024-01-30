import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ isLoading, children }) => {
	return (
		<div className="overlay">
			<ClipLoader
				loading={isLoading}
				size={150}
				aria-label="Loading Spinner"
				data-testid="loader"
			>
				{children}
			</ClipLoader>
		</div>
	);
};

export default Loader;
