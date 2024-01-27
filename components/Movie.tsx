import Image from "next/image";

export const Movie = ({ movie }: { movie: IMovie }) => {
  return (
    <div className="rounded-xl ring ring-yellow-500 cursor-pointer relative group overflow-hidden">
      <Image
        src={movie.coverImg}
        alt="movie"
        width={100}
        height={100}
        unoptimized
        className="w-full h-[40vh] overflow-hidden rounded-2xl object-cover"
      />

      <span className="absolute -top-1 -right-1 rounded-bl-2xl bg-[#0e0e0e] px-2 py-1">
        ⭐ {movie.rating}
      </span>

      <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden group-hover:bg-black opacity-50"></div>

      <div className="px-4 absolute bottom-4 invisible group-hover:visible group-hover:animate-bottom-to-up">
        <h6 className="text-xl font-semibold">{movie.title}</h6>
        <p className="text-gray-200">{movie.publishedDate}</p>
        <p className="text-gray-200">
          {movie.genres?.map((genre: string, _: number) => (
            <span key={_}>{genre} &nbsp; </span>
          ))}
        </p>
      </div>
    </div>
  );
};
