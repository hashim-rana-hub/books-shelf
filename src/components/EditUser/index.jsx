import React, { useContext } from "react";
import Input from "../Input/Input";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../App";

const EditUser = () => {
	const { data, setData } = useContext(userContext);

	const navigation = useNavigate();
	const location = useLocation();

	const formik = useFormik({
		initialValues: {
			name: location.state.user.name,
			email: location.state.user.email,
			phone: location.state.user.phone,
			website: location.state.user.website,
		},
		onSubmit(values) {
			const tempData = [...data];
			let filtered = data?.find((item) => item?.id === location.state.user.id);
			let indexOfFilteredUser = data?.findIndex(
				(item) => item?.id === filtered?.id
			);
			tempData[indexOfFilteredUser] = {
				...tempData[indexOfFilteredUser],
				email: values?.email,
				phone: values?.phone,
				website: values?.website,
				name: values?.name,
			};

			setData(tempData);
			navigation("/users");
		},
	});

	return (
		<div>
			EditUser
			<form onSubmit={formik?.handleSubmit}>
				<Input
					label="Name"
					value={formik.values.name}
					handleChange={formik.handleChange("name")}
				/>
				<Input
					label="Email"
					value={formik.values.email}
					handleChange={formik.handleChange("email")}
				/>
				<Input
					label="Phone"
					value={formik.values.phone}
					handleChange={formik.handleChange("phone")}
				/>
				<Input
					label="Website"
					value={formik.values.website}
					handleChange={formik.handleChange("website")}
				/>
				<div className="button">
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default EditUser;
