export default class DataHelpers {
	static getAddUserInputs(formik) {
		return [
			{
				id: 1,
				name: "username",
				lable: "Username",
				value: formik.values.username,
				type: "text",
				placeHolder: "Enter Username",
				error: formik.errors.username,
			},
			{
				id: 2,
				name: "name",
				lable: "Name",
				value: formik.values.name,
				type: "text",
				placeHolder: "Enter Name",
				error: formik.errors.name,
			},
			{
				id: 3,
				name: "email",
				lable: "email",
				value: formik.values.email,
				type: "email",
				placeHolder: "Enter Email",
				error: formik.errors.email,
			},
			{
				id: 4,
				email: "phone",
				lable: "phone",
				value: formik.values.phone,
				type: "number",
				placeHolder: "Enter Phone",
				error: formik.errors.phone,
			},
			{
				id: 5,
				name: "website",
				lable: "website",
				value: formik.values.website,
				type: "website",
				placeHolder: "Enter Website",
				error: formik.errors.website,
			},
		];
	}

	static getEditUserInputs(formik) {
		return [
			{
				id: 1,
				name: "name",
				lable: "Name",
				value: formik.values.name,
				type: "text",
				error: formik.errors.name,
				disaabled: false,
			},
			{
				id: 2,
				name: "email",
				lable: "email",
				value: formik.values.email,
				type: "email",
				error: formik.errors.email,
				disaabled: false,
			},
			{
				id: 3,
				email: "phone",
				lable: "phone",
				value: formik.values.phone,
				type: "number",
				error: formik.errors.phone,
				disaabled: true,
			},
			{
				id: 4,
				name: "website",
				lable: "website",
				value: formik.values.website,
				type: "website",
				error: formik.errors.website,
				disaabled: false,
			},
		];
	}
}
export const getEditUserInitialValues = (location) => ({
	name: location.state.user.name,
	email: location.state.user.email,
	phone: location.state.user.phone,
	website: location.state.user.website,
});

export const getAddUserInitialValues = {
	username: "",
	name: "",
	email: "",
	phone: "",
	website: "",
};

export const getPages = [
	{ id: 1, page: 1 },
	{ id: 2, page: 2 },
	{ id: 3, page: 3 },
	{ id: 4, page: 4 },
	{ id: 5, page: 5 },
	{ id: 6, page: 6 },
	{ id: 7, page: 7 },
	{ id: 8, page: 8 },
	{ id: 9, page: 9 },
	{ id: 10, page: 10 },
];
