import db from "../config/db.js";

class Duel {
	constructor(user_1) {
		this.user_1 = user_1;
	}

	async save() {
		let sql = `
        INSERT INTO duels(
            user_1_id
        )
SELECT * FROM (SELECT ${this.user_1}) AS tmp
WHERE NOT EXISTS (
    SELECT user_1_id FROM duels WHERE user_1_id = ${this.user_1}
) LIMIT 1
        `;

		const [newDuel, _] = await db.execute(sql);

		return newDuel;
	}

	static async addPlayer(user_2) {
		let sql = `
        UPDATE duels
SET user_2_id = ${user_2}
WHERE NOT EXISTS (SELECT * FROM duels WHERE user_2_id = ${user_2})
 AND NOT EXISTS (SELECT * FROM duels WHERE user_1_id = ${user_2})
  AND NOT EXISTS (SELECT * FROM duels WHERE jury_id = ${user_2})
  AND user_2_id = null LIMIT 1
        `;

		const [addPlayer, _] = await db.execute(sql);

		return addPlayer;
	}

	static async addJury(jury) {
		let sql = `
        INSERT INTO duels(
            jury_id
        )
SELECT * FROM (SELECT ${jury}) AS tmp
WHERE NOT EXISTS (
    SELECT user_2_id FROM duels WHERE user_2_id = ${jury}
) AND NOT EXISTS (
    SELECT user_1_id FROM duels WHERE user_1_id = ${jury}
) AND NOT EXISTS (
    SELECT jury_id FROM duels WHERE jury_id = ${jury}
) LIMIT 1
        `;

		const [addJury, _] = await db.execute(sql);

		return addJury;
	}

	static async setWinner(winner) {
		let sql = `
        INSERT INTO duels(
            winner_id
        )
        VALUES(
            '${winner}'
        )
        `;

		const [newWinner, _] = await db.execute(sql);

		return newWinner;
	}

	static async checkEmptyAndRemove() {
		let sql = `
        DELETE FROM duels
        WHERE user_1_id = null AND user_2_id = null AND jury_id = null
        `;

		await db.execute(sql);
	}

	static async leaveDuel(duel_id, player_id) {
		let sql = `
        UPDATE duels
        SET CASE WHEN user_1_id = ${player_id} THEN user_1_id = null WHEN user_2_id = ${player_id} THEN user_2_id = null WHEN jury_id = ${player_id} THEN jury_id = null END
        WHERE id = ${duel_id}
        `;

		await db.execute(sql);

		const removeDuel = await this.checkEmptyAndRemove();

		return removeDuel;
	}
}

export default Duel;
