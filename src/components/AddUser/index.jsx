import React, { useContext } from "react";
import Input from "../Input/Input";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { validationAddUserSchema } from "../../utils/validationSchema";
import { useId } from "react";

const AddUser = () => {
	const { userData, setUserData, setFetchAgain } = useContext(userContext);

	const navigation = useNavigate();

	const handleFormSubmission = (values) => {
		let time = new Date();
		let id = `${time.getTime()}-${Math.floor(Math.random() * 1000)}`;
		const newUser = { ...values, userId: parseInt(id) };
		console.log("new user ", newUser);
		setUserData([...userData, newUser]);
		setFetchAgain(false);
		navigation("/users");
	};

	const formik = useFormik({
		initialValues: {
			username: "",
			name: "",
			email: "",
			phone: "",
			website: "",
		},
		validationSchema: validationAddUserSchema,
		onSubmit: handleFormSubmission,
	});

	return (
		<div>
			<h1 style={{ textAlign: "center", marginBottom: 20 }}>Add New User</h1>
			<form>
				<Input
					label="Username"
					name="username"
					value={formik.values.username}
					handleChange={formik.handleChange}
					error={formik.touched && formik.errors.username}
					placeholder={"Enter username"}
				/>
				<Input
					label="Name"
					name="name"
					value={formik.values.name}
					handleChange={formik.handleChange}
					error={formik.touched && formik.errors.name}
					placeholder={"Enter user name"}
				/>
				<Input
					label="Email"
					name="email"
					value={formik.values.email}
					handleChange={formik.handleChange}
					error={formik.touched && formik.errors.email}
					placeholder={"Enter user email"}
				/>

				<Input
					label="Phone"
					name="phone"
					type={"number"}
					value={formik.values.phone}
					handleChange={formik.handleChange}
					error={formik.touched && formik.errors.phone}
					placeholder={"Enter user phone"}
				/>
				<Input
					label="Website"
					name="website"
					value={formik.values.website}
					handleChange={formik.handleChange}
					error={formik.touched && formik.errors.website}
					placeholder={"Enter user website"}
				/>
				<div className="button">
					<button onClick={formik.handleSubmit}>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default AddUser;
