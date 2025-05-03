import { useEffect, useState } from "react";
import Link from "next/link";

export default function Modal({ onClose, show, platforms }) {
  const [reviews, setReviews] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [platformsData, setPlatformsData] = useState([]);
  let streamingPlatforms = [];
  async function handleMarkAsWatched() {
    const res = await fetch("/api/tv/" + show.id + "/watched", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: show.id }),
    });
    const data = await res.json();
    console.log("Successfully marked as watched:", data);
  }
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch("/api/tv/" + show.id + "/reviews");
      const data = await res.json();
      console.log(data);
      setReviews(data.data.splice(0, 5));
    };
    const getPlatforms = async () => {
      const res = await fetch("/api/tv/" + show.id + "/platforms");
      const data = await res.json();
      const usPlatforms = data.data?.US?.flatrate ?? [];
      setPlatformsData(usPlatforms);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    getPlatforms();
    fetchReviews();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show?.id]);
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-zinc-900 text-white rounded-2xl p-6 w-full max-w-2xl shadow-xl relative animate-fade-in max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl"
        >
          ✕
        </button>
        <div className="overflow-y-auto max-h-[80vh] p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 ">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="w-full md:w-56 h-[320px] rounded-xl object-cover"
            />
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold">{show.name}</h2>
              <Link
                href={`/show/${show.id}`}
                key={show.id}
                target="_blank"
                className="text-blue-500 hover:underline text-sm"
              >
                <button className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition w-fit">
                  See more details...
                </button>
              </Link>
              <p className="text-sm text-zinc-400">
                First Air Date: {show.first_air_date}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg font-medium">
                  {show.vote_average.toFixed(1)}
                </span>
                <span className="text-zinc-400 text-sm">/ 10</span>
              </div>
              <p
                className={`text-zinc-300 text-sm leading-relaxed ${
                  showDetails ? "" : "line-clamp-4"
                }`}
              >
                {show.overview}
              </p>
              {show.overview.length > 200 && (
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  {showDetails ? "Show Less" : "Show More"}
                </button>
              )}

              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition">
                  Add to Watchlist
                </button>
                <button
                  onClick={handleMarkAsWatched}
                  className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition"
                >
                  Mark as Watched
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mt-6">Streaming Platforms</h2>
            <div className="mt-3 overflow-x-auto">
              <div className="flex gap-4 w-max pb-2">
                {[platformsData].length > 0 ? (
                  platformsData.map((platform) => (
                    <div
                      key={platform.provider_id}
                      className="flex flex-col items-center text-center shrink-0 w-24"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${platform.logo_path}`}
                        alt={platform.provider_name}
                        className="w-8 h-8 rounded-lg"
                      />
                      <span className="text-xs text-zinc-400 mt-1 truncate w-full">
                        {platform.provider_name}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-400 text-sm mt-4">
                    No streaming platforms available.
                  </p>
                )}
              </div>
            </div>
          </div>
          {reviews.length > 0 && (
            <div className="">
              <h2 className="text-xl font-semibold mt-6">Reviews</h2>
              <div className="flex flex-col gap-2 mt-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-zinc-800 rounded-lg p-4 shadow-md"
                  >
                    <h3 className="text-lg font-semibold">
                      {review.author}{" "}
                      <span className="text-sm text-zinc-400">
                        {review.author_details.rating}/10
                      </span>
                    </h3>
                    <p className="text-zinc-300 text-sm">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
