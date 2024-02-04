"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/validators";
import { AlertTriangleIcon, CheckCircle2Icon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { addCategoryAction } from "@/actions/AddCategory";

export default function AddCategory() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      catName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      await addCategoryAction(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
    reset();
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
          <h5 className="text-lg font-semibold text-white">Add a Category</h5>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Category Name"
              {...register("catName", { required: true })}
              className="px-3 py-1.5 rounded-sm w-96 text-black"
            />
            {errors.catName?.message && (
              <p className="text-red-500">{errors.catName?.message}</p>
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
