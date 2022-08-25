import axios from "axios";
import jwt_decode from "jwt-decode";

// in this file are all the functions for actions that require authentication

export const loginUser = async (username: string, password: string) => {
	const res = await fetch("user/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: username, password: password }),
	});

	const resJSON = await res.json();

	if (res.ok) {
		const userObj = {
			accessToken: resJSON.accessToken,
			refreshToken: resJSON.refreshToken,
			username: resJSON.username,
			id: resJSON.id,
		};
		localStorage.setItem("user", JSON.stringify(userObj));
	}

	return resJSON;
};

const newRefreshToken = async (user) => {
	try {
		const res = await axios.post("/user/refresh", { token: user.refreshToken });

		const updatedUser = {
			...user,
			accessToken: res.data.accessToken,
			refreshToken: res.data.refreshToken,
		};

		localStorage.setItem("user", JSON.stringify(updatedUser));

		console.log();

		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const handleRefreshToken = (user) => {
	const axiosJWT = axios.create();

	axiosJWT.interceptors.request.use(
		async (config) => {
			let currentDate = new Date();
			const decodedToken = jwt_decode(user.accessToken);
			if (decodedToken.exp * 1000 < currentDate.getTime()) {
				const data = await newRefreshToken(user);
				config.headers["authorization"] = "Bearer " + data.accessToken;
				config.body = { token: data.refreshToken };
			} else {
				config.headers["authorization"] = "Bearer " + user.accessToken;
				config.body = { token: user.refreshToken };
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	return axiosJWT;
};

export const logoutUser = async () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const axiosJWT = handleRefreshToken(user);

	try {
		const res = await axiosJWT.post("user/logout");

		const resData = await res.data;

		localStorage.removeItem("user");
		return { message: resData, ok: true };
	} catch (err) {
		return { message: "Fail", ok: false };
	}
};
