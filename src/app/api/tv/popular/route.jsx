import { NextResponse } from "next/server";
export async function GET(req) {
  if (!process.env.TMDB_API_KEY) {
    return NextResponse.json({ message: "API key not found" }, { status: 500 });
  }
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_original_language=en&without_genres=10767`
    );
    const data = await res.json();

    if (!data || !data.results) {
      return NextResponse.json(
        { message: "Failed to fetch data" },
        { status: 500 }
      );
    }
    return NextResponse.json({ data: data.results }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
