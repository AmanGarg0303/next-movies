"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { addMovieAction } from "@/actions/AddMovie";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { MovieSchema } from "@/validators";
import { AlertTriangleIcon, CheckCircle2Icon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { getCategoriesAction } from "@/actions/getCategories";

export default function AddMovie() {
  const [cats, setCats] = useState<Array<ICat> | []>([]);

  useEffect(() => {
    const fetchCat = async () => {
      const res = await getCategoriesAction();
      setCats(res?.allCat);
    };

    fetchCat();
  }, []);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleSelectUnselect = (name: string) => {
    if (selectedGenres.includes(name)) {
      setSelectedGenres(selectedGenres.filter((val) => val !== name));
    } else {
      setSelectedGenres((prev) => [...prev, name]);
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(MovieSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      rating: 0,
      coverImg: "",
      genres: selectedGenres,
      publishedDate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof MovieSchema>) => {
    setError("");
    setSuccess("");
    values.genres = selectedGenres;

    startTransition(async () => {
      await addMovieAction(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
    reset();
    setSelectedGenres([]);
  };

  // console.log({ error, success, isPending });
  // console.log(errors);

  return (
    <div>
      <Navbar />

      <div className="px-20 py-24 w-full grid place-items-center">
        <form
          onSubmit={handleSubmit((v) => onSubmit(v))}
          className="flex flex-col justify-center items-center gap-y-10 border p-12 w-fit rounded-lg text-black"
        >
          <h5 className="text-lg font-semibold text-white">Add a movie</h5>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Movie Name"
              {...register("title", { required: true })}
              className="px-3 py-1.5 rounded-sm w-96 text-black"
            />
            {errors.title?.message && (
              <p className="text-red-500">{errors.title?.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Short Description"
              {...register("shortDescription", { required: true })}
              className="px-3 py-1.5 rounded-sm w-96"
            />
            {errors.shortDescription?.message && (
              <p className="text-red-500">
                {errors?.shortDescription?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <textarea
              rows={6}
              placeholder="Description"
              {...register("description", { required: true })}
              className="px-3 py-1.5 rounded-sm w-96"
            />
            {errors.description?.message && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Rating"
              {...register("rating", { required: true, valueAsNumber: true })}
              className="px-3 py-1.5 rounded-sm w-96"
            />
            {errors.rating?.message && (
              <p className="text-red-500">{errors.rating.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Cover Image Url"
              {...register("coverImg", { required: true })}
              className="px-3 py-1.5 rounded-sm w-96"
            />
            {errors.coverImg?.message && (
              <p className="text-red-500">{errors.coverImg.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 w-96 flex-wrap">
              {cats.map((cat: ICat) => (
                <span
                  key={cat.id}
                  className={`text-white cursor-pointer border p-2 rounded-md ${
                    selectedGenres.includes(cat.catName) && "bg-red-500"
                  } `}
                  onClick={() => handleSelectUnselect(cat.catName)}
                >
                  {cat.catName}
                </span>
              ))}
            </div>
            {errors.genres?.message && (
              <p className="text-red-500">{errors.genres.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Published Date"
              {...register("publishedDate", { required: true })}
              className="px-3 py-1.5 rounded-sm w-96"
            />
            {errors.publishedDate?.message && (
              <p className="text-red-500">{errors.publishedDate.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={isPending}
          >
            Submit
          </Button>

          {error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
              <AlertTriangleIcon className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
              <CheckCircle2Icon className="h-4 w-4" />
              <p>{success}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
