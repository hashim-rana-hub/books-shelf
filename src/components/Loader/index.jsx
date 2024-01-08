import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ isLoading }) => {
	return (
		<div className="overlay">
			<ClipLoader
				loading={isLoading}
				size={150}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};

export default Loader;
