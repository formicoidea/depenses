import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "../../components/utils/jwt";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	const [_, token] = _req.headers.authorization
		? _req.headers.authorization.split(" ")
		: [undefined, undefined];

	try {
		if (!token) throw new Error("Paramètres manquants");
		const verify = await verifyJWT(token);
		if (!verify.active) throw new Error("Connectez-vous à nouveau");
		const notion = new Client({
			auth: verify.payload.secret,
		});
		const response = await notion.databases.retrieve({
			database_id: verify.payload.id,
		});
		//console.log(response);
		res.status(200).json(response);
	} catch (err: any) {
		console.error(err.body);
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default handler;
