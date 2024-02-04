import { getCategoriesAction } from "@/actions/getCategories";

export const Genres = async () => {
  const { allCat } = await getCategoriesAction();

  return (
    <div className="flex gap-x-24 mx-16 px-16 py-4 no-scrollbar overflow-x-auto">
      {allCat.map((cat: any) => (
        <div
          key={cat.id}
          className="whitespace-nowrap border px-8 py-4 text-xl font-semibold rounded-xl cursor-pointer bg-[#0e0e0e] transition duration-100 transform hover:scale-125"
        >
          {cat.catName}
        </div>
      ))}
    </div>
  );
};
