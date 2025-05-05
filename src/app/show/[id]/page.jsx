import ShowPageClient from "./ShowPageClient";

export default async function ShowPage(props) {
  const params = await props.params;
  const { id } = params;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" }
  );

  const show = await res.json();

  return <ShowPageClient id={id} show={show} />;
}
