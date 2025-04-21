"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Modal from "./components/Modal";

export default function Home() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  const fetchPopularTV = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const data = await res.json();
    setShows(data.results);
  };
  async function handleSearch() {
    if (searchQuery.trim() === "") {
      return;
    }
    setIsSearching(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const data = await res.json();
    setShows(data.results);
  }

  useEffect(() => {
    fetchPopularTV();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white px-6 py-12">
      <h1 className="text-4xl font-bold">SeriesTrackr</h1>
      <section className="min-h-[40vh] bg-grey text-white flex flex-col justify-center items-center space-y-6 px-6">
        <h1 className="text-4xl font-bold text-center">
          Track Your Favorite <br /> TV Series
        </h1>
        <p className="text-zinc-400 text-center max-w-md">
          Keep record of what you have watched and discover new shows to enjoy.
        </p>
        <div className="w-full max-w-xl">
          <div className="flex items-center bg-zinc-800/60 border border-zinc-700 backdrop-blur-lg rounded-full px-4 py-2 w-full max-w-xl mx-auto shadow-md">
            <input
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              type="text"
              value={searchQuery}
              placeholder="Search for a TV show"
              className="flex-1 bg-transparent placeholder-zinc-400 text-white focus:outline-none text-base"
            />
            <button
              onClick={handleSearch}
              className="ml-4 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <h1 className={`text-2xl font-semibold ${isSearching ? "" : "mb-6"}`}>
          {isSearching ? "Search Results" : "Popular TV Shows"}
        </h1>
        {isSearching && (
          <>
            <h2 className="text-zinc-400 text-sm">
              Results for "{searchQuery}"
            </h2>
            <button
              className="text-zinc-400 text-sm hover:text-white transition mb-4"
              onClick={() => {
                setIsSearching(false);
                setSearchQuery("");
                fetchPopularTV();
              }}
            >
              Clear Results
            </button>
          </>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {shows.map((show) => (
            //<Link href={`/show/${show.id}`} key={show.id} className="group">
            <div
              onClick={() => {
                router.push(`/?id=${show.id}`);
                setSelectedShow(show);
              }}
              key={show.id}
              className="bg-zinc-800/60 rounded-xl overflow-hidden border border-zinc-700 backdrop-blur-md shadow-md hover:scale-[1.02] transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className="w-full h-[280px] object-cover"
              />
            </div>
            //</Link>
          ))}
        </div>
        {selectedShow && (
          <Modal
            show={selectedShow}
            onClose={() => {
              setSelectedShow(null);
            }}
          />
        )}
      </section>
    </div>
  );
}
