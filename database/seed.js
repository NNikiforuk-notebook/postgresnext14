const { db } = require("@vercel/postgres");
const { harryPotter } = require("../data/placeholder.js");

//Creating database, table and seeding it with placeholder data
async function seedDatabase(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

		const createTable =
			await client.sql`CREATE TABLE IF NOT EXISTS harryPotter (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            age INT NOT NULL,
            house VARCHAR(255) NOT NULL
        );
        `;

		console.log(`Created "characters" table`);

		const insertedCharacters = await Promise.all(
			harryPotter.map(
				async (character) => client.sql`
            INSERT INTO harryPotter (id, name, age, house) VALUES (${character.id}, ${character.name}, ${character.age}, ${character.house})
            ON CONFLICT (id) DO NOTHING;
            `
			)
		);

		console.log(`Seeded ${insertedCharacters.length} characters`);

		return {
			createTable,
			characters: insertedCharacters,
		};
	} catch (error) {
		console.error("Error seeding characters:", error);
		throw error;
	}
}

async function main() {
	const client = await db.connect();

	await seedDatabase(client);
}

main().catch((err) => {
	console.error("An error occurred while attempting to seed the database", err);
});
