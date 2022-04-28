import jwt from "jsonwebtoken";
require("dotenv").config();

interface JwtPayload {
	[key: string]: any;
	iss?: string | undefined;
	sub?: string | undefined;
	aud?: string | string[] | undefined;
	exp?: number | undefined;
	nbf?: number | undefined;
	iat?: number | undefined;
	jti?: string | undefined;
	id: String;
	secret: String;
}

export const createJWT = async (
	id: string,
	secret: string,
	expiresIn: number
) => {
	const token = jwt.sign({ id, secret }, `${process.env.SECRET}`, {
		expiresIn,
	});
	return token;
};

export const verifyJWT = async (token: string) => {
	const payload: any = jwt.verify(token, `${process.env.SECRET}`);
	if (payload) {
		return {
			payload,
			active: true,
		};
	} else {
		return {
			payload,
			active: false,
		};
	}
};
