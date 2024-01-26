import { sql } from "@vercel/postgres";

export async function postCharacter(characterData: {
	id: number;
	name: string;
	age: number;
	house: string;
}) {
	try {
		console.log("Starting posting...");

		await sql`
            INSERT INTO harryPotter (id, name, age, house)
			VALUES (${characterData.id}, ${characterData.name}, ${characterData.age}, ${characterData.house})
            ON CONFLICT (id) DO NOTHING;
            `;

		console.log("Character added");
	} catch (error) {
		console.error("Database error:", error);
		throw new Error("Failed to add a character");
	}
}
