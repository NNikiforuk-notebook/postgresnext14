import { fetchHarryPotter } from "@/database/fetch";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const characters = await fetchHarryPotter();

		const character = characters.find(
			(character) => character.id === parseInt(params.id)
		);

		return Response.json(character);
	} catch (error) {
		console.error("Error in GET request:", error);
	}
}


