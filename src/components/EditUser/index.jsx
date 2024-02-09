import React, { useContext } from "react";
import Input from "../Input/Input";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { validationSchema } from "../../utils/validationSchema";

const EditUser = () => {
	const { userData, setUserData, setFetchAgain } = useContext(userContext);

	const navigation = useNavigate();
	const location = useLocation();

	const handleFormSubmission = (values) => {
		setFetchAgain(false);
		const tempData = [...userData];
		let filtered = userData?.find(
			(item) => item?.id === location.state.user.id
		);
		let indexOfFilteredUser = userData?.findIndex(
			(item) => item?.id === filtered?.id
		);
		tempData[indexOfFilteredUser] = {
			...tempData[indexOfFilteredUser],
			email: values?.email,
			phone: values?.phone,
			website: values?.website,
			name: values?.name,
		};
		setUserData(tempData);
		navigation("/users");
	};

	const formik = useFormik({
		initialValues: {
			name: location.state.user.name,
			email: location.state.user.email,
			phone: location.state.user.phone,
			website: location.state.user.website,
		},
		validationSchema: validationSchema,
		onSubmit: handleFormSubmission,
	});

	return (
		<div>
			EditUser
			<form>
				<Input
					label="Name"
					name="name"
					value={formik.values.name}
					handleChange={formik.handleChange}
					error={formik.errors.name}
				/>
				<Input
					label="Email"
					name="email"
					value={formik.values.email}
					handleChange={formik.handleChange}
					error={formik.errors.email}
				/>
				<Input
					label="Phone"
					name="phone"
					value={formik.values.phone}
					handleChange={formik.handleChange}
					disabled
				/>
				<Input
					label="Website"
					name="website"
					value={formik.values.website}
					handleChange={formik.handleChange}
					error={formik.errors.website}
				/>
				<div className="button">
					<button onClick={formik.handleSubmit}>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default EditUser;
