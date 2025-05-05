"use client";
import { useEffect, useState } from "react";

export default function ShowPageClient({ id, show }) {
  const [casts, setCasts] = useState([]);
  const getCast = async () => {
    const res = await fetch("/api/tv/" + id + "/cast", { cache: "no-store" });
    const data = await res.json();
    setCasts(data.data);
  };
  useEffect(() => {
    getCast();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white px-6 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
          className="rounded-xl w-full max-w-xs"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{show.name}</h1>
          <p className="text-zinc-400 text-sm mb-4">
            First air date: {show.first_air_date}
          </p>
          <p className="text-zinc-200 leading-relaxed">{show.overview}</p>
        </div>
      </div>
      <div>
        <h2>Cast</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {casts.map((cast) => {
            return (
              <div key={cast.id} className="flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt={cast.name}
                  className="w-24 h-24 object-cover rounded-full border border-zinc-700 shadow-md"
                />
                <h3 className="text-lg font-semibold">{cast.name}</h3>
                <p className="text-zinc-400 text-sm">{cast.character}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
