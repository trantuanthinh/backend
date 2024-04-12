import jwt from "jsonwebtoken";
import authToken from "./AuthToken";

const make = (user) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ data: user },
			authToken.ACCESS_TOKEN,
			{
				algorithm: "HS256", // Protocol to Encrypt Data
				expiresIn: authToken.TOKEN_TIME_LIFE,
			},
			(err, __token) => {
				if (err) {
					return reject(err);
				}
				return resolve(__token);
			},
		);
	});
};

const check = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, authToken.ACCESS_TOKEN, (err, data) => {
			if (err) {
				return reject(err);
			}
			return resolve(data);
		});
	});
};

export default {
	make,
	check,
};
