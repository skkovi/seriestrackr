export default async function ShowPage(props) {
  const params = await props.params;
  const { id } = params;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const show = await res.json();
  console.log(show);
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 max-w-4xl mx-auto">
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
    </div>
  );
}
