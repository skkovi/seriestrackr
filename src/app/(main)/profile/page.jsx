import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
export default async function Profile() {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const { user_metadata } = user;
  const { id } = user;
  const { data: watchedShowIds, error: profileError } = await supabase
    .from("user_watched_shows")
    .select("*")
    .eq("user_id", id);
  const showIds = watchedShowIds
    ? watchedShowIds.map((item) => item.tv_show_id)
    : [];
  let watchedShowDetails = [];
  if (showIds.length > 0 && TMDB_API_KEY) {
    const fetchPromises = showIds.map(async (showId) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${showId}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      return response.json();
    });
    watchedShowDetails = await Promise.all(fetchPromises);
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white px-6 py-36">
      <h1 className="text-4xl font-bold mb-4">{user_metadata.email}</h1>
      <p className="text-zinc-400 text-sm mb-4">
        Welcome to your profile page!
      </p>
      <h2 className="text-2xl font-semibold mb-6">Watched Shows:</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {watchedShowDetails &&
          watchedShowDetails.map((show) => (
            <div
              key={show.id}
              className="bg-zinc-800/60 rounded-xl overflow-hidden border border-zinc-700 backdrop-blur-md shadow-md hover:scale-[1.02] transition"
            >
              <Link
                href={`/show/${show.id}`}
                key={show.id}
                target="_blank"
                className="text-blue-500 hover:underline
                text-sm"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="w-full h-[280px] object-cover"
                />
              </Link>
              <h2 className="text-xl font-semibold">{show.tv_show_id}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
