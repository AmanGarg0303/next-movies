import { getMoviesAction } from "@/actions/getMovies";
import { Movie } from "@/components/Movie";

export const Movies = async () => {
  const movies: Array<IMovie> = await getMoviesAction();
  console.log("helo");

  return (
    <div className="grid grid-cols-5 gap-x-16 gap-y-20 px-16 py-8 ">
      {movies?.map((v, _) => (
        <Movie key={_} movie={v} />
      ))}
    </div>
  );
};
