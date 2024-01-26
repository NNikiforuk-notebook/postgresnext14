import { sql } from "@vercel/postgres";

export async function deleteCharacter(id: number) {
	try {
        console.log("Starting deleting...")

		await sql`DELETE FROM harryPotter WHERE id = ${id}`;

		console.log("Character deleted");
	} catch (error) {
		console.error("Database error:", error);
		throw new Error("Failed to delete a character");
	}
}
