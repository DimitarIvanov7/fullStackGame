import { handleRefreshToken } from "./Auth";

export const getUsername = async (id: string) => {
	const res = await fetch("/user/name/" + id);

	const resJSON = await res.json();

	return resJSON[0].name;
};

export const getWearedClothes = async (id: string) => {
	const res = await fetch("/user/weared/" + id);

	const resJSON = await res.json();

	return resJSON;
};

export const setDBWearedClothes = async (userId: string, clothes: string[]) => {
	const user = JSON.parse(localStorage.getItem("user"));

	const { id } = user;

	if (parseInt(userId) !== id)
		return { ok: false, message: "That's not your profile!" };

	const axiosJWT = handleRefreshToken(user);

	const body = { clothes: JSON.stringify(clothes) };

	try {
		const res = await axiosJWT.post(`/user/weared/${userId}`, body);

		const resData = await res.data;

		console.log(resData);

		return { message: resData, ok: true };
	} catch (err) {
		return { message: "Fail", ok: false };
	}
};

export const createUser = async (username: string, password: string) => {
	const res = await fetch("/user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: username, password: password }),
	});

	const resJSON = await res.json();

	return resJSON;
};
