import db from "../config/db.js";

class User {
	constructor(name, email, password) {
		this.name = name;
		this.email = email;
		this.password = password;
	}

	async save() {
		let sql = `
        INSERT INTO users(
            name,
            email,
            password
        )
        VALUES(
            '${this.name}',
            '${this.email}',
            '${this.password}'
        )
        `;

		const [newUser, _] = await db.execute(sql);

		return newUser;
	}

	static async getClothes(id) {
		let sql = `SELECT img, color, type FROM clothes
        INNER JOIN ownership
        ON clothes.id = ownership.clothes_id
        WHERE ownership.user_id = ${id}
        `;

		const [getClothes, _] = await db.execute(sql);

		return getClothes;
	}

	static async getUserbyName(name) {
		let sql = `SELECT * FROM users WHERE name = '${name}'  LIMIT 1`;

		const [getUser, _] = await db.execute(sql);
		return getUser;
	}

	static async getUsername(id) {
		let sql = `SELECT name FROM users WHERE id = '${id}'  LIMIT 1`;

		const [getUser, _] = await db.execute(sql);
		return getUser;
	}

	static async getWeared(id) {
		let sql = `SELECT img, color, type FROM clothes
        INNER JOIN wearedclothes
        ON clothes.id = wearedclothes.clothes_id
        WHERE wearedclothes.users_id = ${id}
        `;

		const [getWeared, _] = await db.execute(sql);

		return getWeared;
	}

	static async getClothesByImage(images) {
		const values =
			images.reduce((prev, curr) => prev + `'${curr}', `, "(").slice(0, -2) +
			")";

		let sql = `SELECT id FROM clothes WHERE img IN${values}

		`;
		const [clothes, _] = await db.execute(sql);

		return clothes;
	}

	static async removeWeared(id) {
		let sql = `DELETE FROM wearedclothes WHERE users_id=${id};
		`;
		db.execute(sql);
	}

	static async setWeared(id, clothes) {
		await this.removeWeared(id);
		const imgIds = await this.getClothesByImage(clothes);

		const values = imgIds
			.reduce((prev, curr) => prev + `(${id}, ${curr.id}), `, "")
			.slice(0, -2);

		let sql = `INSERT INTO wearedclothes (
			users_id,
			clothes_id
		)
		VALUES
		${values}
		`;

		const [setWeared, _] = await db.execute(sql);
		return setWeared;
	}

	async getAllUsers() {}

	async delete() {}

	async addWins() {}

	async addLoses() {}

	async buyClothes() {}

	// for future implementation
	// async sellClothes() { }

	// async getMoney() {}
}

export default User;
