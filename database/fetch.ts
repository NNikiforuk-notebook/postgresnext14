import { sql } from "@vercel/postgres";
import { harryPotterTypes } from "@/data/types";

export async function fetchHarryPotter() {
	try {
		console.log("Fetching Harry Potter data...");

		const data = await sql<harryPotterTypes>`SELECT * FROM harryPotter`;

		console.log("Data fetch completed after 3 seconds");

		return data.rows;
	} catch (error) {
		console.error("Database error:", error);
		throw new Error("Failed to fetch harryPotter data");
	}
}
