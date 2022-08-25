import pkg from "jsonwebtoken";
const { verify, sign } = pkg;
const secretAccessKey = process.env.ACCESS_TOKEN_SECRET;

// generate jwt token when user logs in. Token expires in 40 min
export const generateAccessToken = (userId) => {
	return sign({ id: userId }, secretAccessKey, {
		expiresIn: "5s",
	});
};

export const generateRefreshToken = (userId) => {
	return sign({ id: userId }, "myRefreshSecretKey");
};

// function that verifies the jwt using the secret key. This fucntion is used for every endpoint that requeries authentication
export const verifyUser = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];
		secretAccessKey &&
			verify(token, secretAccessKey, (err, user) => {
				if (err) {
					return res.status(403).json("Token is not valid!");
				}

				req.user = user;
				next();
			});
	} else {
		res.status(401).json("You are not authenticated!");
	}
};
