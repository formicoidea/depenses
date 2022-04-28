import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
import { createJWT } from "../../components/utils/jwt";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	const id = _req.body.id ? _req.body.id : undefined;
	const secret = _req.body.secret ? _req.body.secret : undefined;
	try {
		if (!id || !secret) throw new Error("Il manque des informations");
		const notion = new Client({
			auth: secret,
		});
		const response = await notion.databases.retrieve({
			database_id: id,
		});
		if (response) {
			const expireIn = 10000 * 24 * 60 * 60 * 1000; //10000 jours en millisecondes
			const token = await createJWT(id, secret, expireIn);
			res.status(200).json({ token });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ statusCode: 400, message: error.message });
	}
};

export default handler;
