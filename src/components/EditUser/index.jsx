import React, { useContext } from "react";
import Input from "../Input/Input";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { validationSchema } from "../../utils/validationSchema";
import { USERS } from "../../utils/routeConstants";
import DataHelpers, { getEditUserInitialValues } from "../../utils/dataHelpers";

const EditUser = () => {
	const { userData, setUserData, setFetchAgain } = useContext(userContext);

	const navigation = useNavigate();
	const location = useLocation();

	const handleFormSubmission = (values) => {
		if (userData) {
			setFetchAgain(false);
			const tempData = [...userData];
			let targetUser = userData?.find(
				(item) => item?.id === location.state.user.id
			);
			let indexOfTargetedUser = userData?.findIndex(
				(item) => item?.id === targetUser?.id
			);
			tempData[indexOfTargetedUser] = {
				...tempData[indexOfTargetedUser],
				name: values?.name,
				email: values?.email,
				phone: values?.phone,
				website: values?.website,
			};
			setUserData(tempData);
			navigation(USERS);
		} else alert("404");
	};

	const formik = useFormik({
		initialValues: getEditUserInitialValues(location),
		validationSchema: validationSchema,
		onSubmit: handleFormSubmission,
	});

	return (
		<div>
			EditUser
			<form>
				{DataHelpers.getEditUserInputs(formik).map((inp) => (
					<div key={inp?.id}>
						<Input
							label={inp?.lable}
							name={inp?.name}
							value={inp?.value}
							handleChange={formik.handleChange}
							error={inp?.error}
							disabled={inp?.disaabled}
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

export default EditUser;
