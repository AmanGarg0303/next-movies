"use client";
import { Movie } from "@/components/Movie";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const Movies = () => {
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(2);

  const [movies, setMovies] = useState<Array<IMovie>>([]);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    setPage(Number(sessionStorage.getItem("page")) || 1);
    setTotalPages(Number(sessionStorage.getItem("totalPages")) || 2);
    setMovies(JSON.parse(sessionStorage.getItem("movies")) || []);
  }, []);

  const fetchData = async () => {
    const res = await fetch(`/api/movies?page=${page}&limit=${2}`);
    const data = await res.json();

    if (page < data.totalPages) {
      setPage((prev) => prev + 1);
    }
    if (data.totalPages !== totalPages) {
      setTotalPages(data.totalPages);
    }

    setMovies([...movies, ...data.data]);
    sessionStorage.setItem("page", JSON.stringify(page));
    sessionStorage.setItem("totalPages", JSON.stringify(totalPages));
    sessionStorage.setItem("movies", JSON.stringify(movies));
  };

  // console.log(sessionStorage.getItem("movies"));

  useEffect(() => {
    if (inView) {
      fetchData();
    }
  }, [inView]);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-16 gap-y-20 px-16 py-8">
        {movies && movies?.map((v, _) => <Movie key={_} movie={v} />)}
      </div>
      {page < totalPages && (
        <div ref={ref} className="py-4 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-loader-2 animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      )}
    </>
  );
};
