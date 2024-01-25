const genres = [
  "Comedy",
  "Drama",
  "Horror",
  "Thriller",
  "Mystery",
  "Action",
  "Sci-fic",
  "Documentry",
  "Fantasy",
  "Adventure",
  "Short Story",
];

export const Genres = () => {
  return (
    <div className="flex gap-x-24 mx-16 px-16 py-4 no-scrollbar overflow-x-auto">
      {genres.map((genre, _) => (
        <div
          key={_}
          className="whitespace-nowrap border px-8 py-4 text-xl font-semibold rounded-xl cursor-pointer bg-[#0e0e0e] transition duration-100 transform hover:scale-125"
        >
          {genre}
        </div>
      ))}
    </div>
  );
};
