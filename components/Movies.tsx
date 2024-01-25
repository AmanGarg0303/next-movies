import { Movie } from "@/components/Movie";

export const Movies = () => {
  return (
    <div className="grid grid-cols-5 gap-x-16 gap-y-20 px-16 py-8 ">
      {Array(20)
        .fill(null)
        .map((v, _) => (
          <Movie key={_} />
        ))}
    </div>
  );
};
