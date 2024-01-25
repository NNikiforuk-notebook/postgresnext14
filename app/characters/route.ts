import { fetchHarryPotter } from "@/database/fetch";

export async function GET() {
	try {
		const result = await fetchHarryPotter();
		
		return new Response(JSON.stringify(result));
	} catch (error) {
		console.error("Error in GET request:", error);
	}
}
