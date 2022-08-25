import Duel from "../models/Duels.js";

export const duel_create = async (req, res) => {
	const user_1 = req.body.user_1;

	try {
		let duel = new Duel(user_1);
		duel = await duel.save();

		res.json("Successfully created!");
	} catch (error) {
		res.json(error);
	}
};

export const add_player = async (req, res) => {
	const player = parseInt(req.body.user_id);

	try {
		await Duel.addPlayer(player);

		res.json("Successfully created!");
	} catch (error) {
		res.json(error);
	}
};
