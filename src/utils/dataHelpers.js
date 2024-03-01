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
