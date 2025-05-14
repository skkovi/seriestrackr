"use client";
import { useEffect, useState } from "react";

export default function ShowPageClient({ id, show }) {
  const [casts, setCasts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCast = async () => {
    const res = await fetch("/api/tv/" + id + "/cast", { cache: "no-store" });
    const data = await res.json();
    setCasts(data.data);
  };
  const getReviews = async () => {
    const res = await fetch("/api/tv/" + id + "/reviews", {
      cache: "no-store",
    });
    const data = await res.json();
    setReviews(data.data);
  };
  useEffect(() => {
    getCast();
    getReviews();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-grey via-zinc-900 to-zinc-800 text-white px-6 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
          className="rounded-xl w-full max-w-xs"
        />
        <div className="text-sm space-y-1">
          <h1 className="text-4xl font-bold mb-4">{show.name}</h1>
          <div>
            <p className="text-zinc-400 text-sm mb-4">
              <strong>First air date:</strong> {show.first_air_date}
            </p>
            <p className="text-zinc-400 text-sm mb-4">
              <strong>Rating:</strong> {show.vote_average} / 10
            </p>
            {show?.genres?.length > 0 && (
              <p className="text-zinc-400 text-sm mb-4">
                <strong>Genres:</strong>{" "}
                {show.genres.map((g) => g.name).join(", ")}
              </p>
            )}
          </div>

          <p className="text-zinc-200 leading-relaxed">{show.overview}</p>
        </div>
      </div>
      <div className="bg-zinc-800/60 rounded-xl p-6 border border-zinc-700 shadow-xl mt-8 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-6">Cast</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
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
      <div className="bg-zinc-800/60 rounded-xl p-6 border border-zinc-700 shadow-xl mt-8 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
        {reviews.map((review) => {
          return (
            <div
              key={review.id}
              className="flex flex-col items-start mb-8 bg-zinc-800/60 p-4 rounded-lg border border-zinc-700 shadow-md"
            >
              {review.author_details.avatar_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                  alt={review.author}
                  className="w-12 h-12 object-cover rounded-full border border-zinc-700 shadow-md"
                />
              ) : (
                <div className="w-12 h-12 bg-zinc-700 rounded-full border border-zinc-700 shadow-md"></div>
              )}
              <h3 className="text-lg font-semibold">{review.author}</h3>
              <p className="text-zinc-400 text-sm">{review.content}</p>
              <p className="text-zinc-400 text-sm">
                Rating: {review.author_details.rating} / 10
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
