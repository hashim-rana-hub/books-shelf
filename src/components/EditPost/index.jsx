import { useFormik } from "formik";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Input from "../Input/Input";
import { editUserPost } from "../../api";

const EditPost = () => {
	const location = useLocation();

	const formik = useFormik({
		initialValues: {
			title: location.state.post.title,
			body: location.state.post.body,
		},
		validate: (values) => {
			const errors = {};

			if (!values.title) {
				errors.title = "Required";
			}

			if (!values.body) {
				errors.body = "Required";
			}

			return errors;
		},

		// Form submission logic
		onSubmit: (values) => {
			console.log("from on sbmit", values);
			editUserPost(location.state.post.id, { values });
		},
	});
	return (
		<div>
			<h1>EditPost</h1>
			<form className="editForm" onSubmit={formik.handleSubmit}>
				<Input
					value={formik.values.title}
					label="Title"
					handleChange={formik.handleChange("title")}
				/>
				<Input
					value={formik.values.body}
					label="Description"
					multiline
					handleChange={formik.handleChange("body")}
				/>
				<div className="button">
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default EditPost;
