import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "../../components/utils/jwt";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	const [_, token] = _req.headers.authorization
		? _req.headers.authorization.split(" ")
		: [undefined, undefined];
	const filter = _req.body.filter ? _req.body.filter : undefined;
	const sorts = _req.body.sorts ? _req.body.sorts : [];
	console.log(filter, sorts);
	try {
		if (!token) throw new Error("Paramètres manquants");
		const verify = await verifyJWT(token);
		if (!verify.active) throw new Error("Connectez-vous à nouveau");
		const recuring = async (data = [], cursor = "") => {
			try {
				const notion = new Client({
					auth: verify.payload.secret,
				});
				const response = await notion.databases.query({
					database_id: verify.payload.id,
					filter,
					sorts,
					start_cursor: cursor == "" ? undefined : cursor,
				});
				const _data = [...data, ...response.results];
				if (response.has_more) {
					return recuring(_data, response.next_cursor);
				} else {
					return _data;
				}
			} catch (error) {
				console.log(error);
				return [];
			}
		};
		const results = await recuring();
		console.log(results.length);

		res.status(200).json(results);
	} catch (err: any) {
		console.error(err.body);
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default handler;
