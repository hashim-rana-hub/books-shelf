import React, { useContext } from "react";
import Input from "../Input/Input";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { validationAddUserSchema } from "../../utils/validationSchema";
import { useId } from "react";
import { USERS } from "../../utils/routeConstants";
import DataHelpers, {
	getAddFormInputs,
	getAddUserInitialValues,
} from "../../utils/dataHelpers";

const AddUser = () => {
	const { userData, setUserData, setFetchAgain } = useContext(userContext);

	const navigation = useNavigate();

	const handleFormSubmission = (values) => {
		let time = new Date();
		let id = `${time.getTime()}-${Math.floor(Math.random() * 1000)}`;
		const newUser = { ...values, userId: parseInt(id) };
		setUserData([...userData, newUser]);
		setFetchAgain(false);
		navigation(USERS);
	};

	const formik = useFormik({
		initialValues: getAddUserInitialValues,
		validationSchema: validationAddUserSchema,
		onSubmit: handleFormSubmission,
	});

	return (
		<div>
			<h1 style={{ textAlign: "center", marginBottom: 20 }}>Add New User</h1>
			<form>
				{DataHelpers.getAddUserInputs(formik).map((inp) => (
					<div key={inp?.id}>
						<Input
							label={inp?.lable}
							name={inp?.name}
							value={inp.value}
							type={inp?.type}
							handleChange={formik.handleChange}
							error={formik.touched && inp?.error}
							placeholder={inp?.placeHolder}
						/>
					</div>
				))}
				<div className="button">
					<button onClick={formik.handleSubmit}>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default AddUser;
