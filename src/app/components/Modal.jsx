import { useEffect, useState } from "react";
export default function Modal({ onClose, show }) {
  const [reviews, setReviews] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${show.id}/reviews?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await res.json();
      setReviews(data.results.splice(0, 5));
    };
    fetchReviews();
  });
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
                <button className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition">
                  Mark as Watched
                </button>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
}
