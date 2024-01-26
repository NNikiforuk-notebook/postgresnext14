import { deleteCharacter } from "@/database/delete";
import { fetchHarryPotter } from "@/database/fetch";
import { postCharacter } from "@/database/post";
import { NextRequest } from "next/server";

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		await deleteCharacter(id);

		return new Response("Character deleted");
	} catch (error) {
		console.error("Error in GET request:", error);
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		console.log("Request body:", body);
		await postCharacter(body);

		return new Response("Character added!");
	} catch (error) {
		console.error("Error in POST request:", error);
		// Return an error response
		return new Response("Failed to add character", { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {
		const characters = await fetchHarryPotter();
		const searchParams = request.nextUrl.searchParams;
		const query = searchParams.get("age");

		if (query) {
			const filteredQuery = characters.filter(
				(character) => character.age === parseInt(query)
			);
			return Response.json(filteredQuery);
		} else {
			return Response.json(characters);
		}
	} catch (error) {
		console.error("Error in GET request:", error);
	}
}
