import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "./Authentication.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;

// user_index, user_details, user_get, user_create user_delete

export const user_create = async (req, res) => {
	// const { error } = registerValidation(req.body);

	// if (error) {
	// 	return res.status(400).send(error.details[0].message);
	// }

	const name = req.body.name;
	const password = req.body.password;
	const email = req.body.email;

	if (!name || !password) {
		res.status(406).json("Not enough data");
		return;
	}

	const salt = await bcrypt.genSalt();
	const hashedPass = await bcrypt.hash(password, salt);

	const [exists, _] = await User.getUserbyName(name);

	if (exists) {
		res.json("User already exists");
		return;
	}

	try {
		let user = new User(name, email, hashedPass);
		user = await user.save();

		res.json("Successfully created!");
	} catch (error) {
		res.json(error);
	}
};

export const user_index = async (req, res) => {
	const id = parseInt(req.params.id);

	const clothes = await User.getClothes(id);
	res.json(clothes);
};

export const user_getWeared = async (req, res) => {
	const id = parseInt(req.params.id);

	const clothes = await User.getWeared(id);
	res.json(clothes);
};

export const user_setWeared = async (req, res) => {
	const id = parseInt(req.params.id);

	const clothesImg = JSON.parse(req.body.clothes);

	const clothes = await User.setWeared(id, clothesImg);
	res.json(clothes);
};

export const user_getName = async (req, res) => {
	const id = parseInt(req.params.id);

	const name = await User.getUsername(id);

	res.json(name);
};

// Authentication

// refresh tokens
let refreshTokens = [];

export const refresh_token = async (req, res) => {
	//take the refresh token from the user
	const refreshToken = req.body.token;

	//send error if there is no token or it's invalid
	if (!refreshToken) return res.status(401).json("You are not authenticated!");
	if (!refreshTokens.includes(refreshToken)) {
		return res.status(403).json("Refresh token is not valid!");
	}
	verify(refreshToken, "myRefreshSecretKey", (err, user) => {
		err && console.log(err);
		refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

		const newAccessToken = generateAccessToken(user.id);
		const newRefreshToken = generateRefreshToken(user.id);

		refreshTokens.push(newRefreshToken);

		res.status(200).json({
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		});
	});
};

export const user_login = async (req, res) => {
	const name = req.body.name;
	const password = req.body.password;

	const [validName, _] = await User.getUserbyName(name);

	if (!validName) {
		res.json("Wrong username");
		return;
	}

	const validPass = await bcrypt.compare(password, validName.password);

	if (validPass) {
		//Generate an access token
		const accessToken = generateAccessToken(validName.id);
		const refreshToken = generateRefreshToken(validName.id);

		refreshTokens.push(refreshToken);

		res.json({
			username: name,
			id: validName.id,
			accessToken,
			refreshToken,
		});
	} else {
		res.status(400).json("Wrong password!");
	}
};

export const user_logout = (req, res) => {
	const refreshToken = req.body.token;
	refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
	res.status(200).json("You logged out successfully.");
};
