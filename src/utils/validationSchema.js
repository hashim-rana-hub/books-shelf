import * as Yup from "yup";
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	website: Yup.string().required("Website is required"),
});
export const validationAddUserSchema = Yup.object({
	username: Yup.string().required("Username is required"),
	name: Yup.string().required("Name is required"),
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	// address: Yup.string().required("Adddress is required"),
	phone: Yup.string()
		.matches(/^\d+$/, "Phone number is not valid")
		.required("Phone number is required"),
	website: Yup.string().required("Website is required"),
});
