"use client";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const LIMIT: number = 5;

export const CategoriesList = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [categories, setCategories] = useState<Array<ICat>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/categories?page=${page}&limit=${LIMIT}`);
      const data = await res.json();

      if (data.totalPages !== totalPages) {
        setTotalPages(data.totalPages);
      }

      setCategories(data.data);
    };

    fetchData();
  }, [page]);

  const handleDeleteCategory = async (catId: string) => {
    try {
      await fetch(`/api/categories/${catId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-300 border border-gray-400">
        <thead className="text-sm text-white uppercase bg-[#201f23] border-b border-gray-400">
          <tr className="tracking-wider">
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Category Name
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Movie Count
            </th> */}
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {categories?.map((category) => (
            <tr key={category.id} className="border-b hover:bg-gray-900">
              <td className="px-6 py-4">{category.id}</td>
              <td className="px-6 py-4">{category.catName}</td>
              {/* <td className="px-6 py-4">24</td> */}
              <td className="px-6 py-4">{category.createdAt.slice(0, 10)}</td>
              <td className="px-6 py-4 flex gap-x-3 items-center">
                <Trash2Icon
                  className="w-5 text-red-500 cursor-pointer hover:text-red-600"
                  onClick={(e) => handleDeleteCategory(category.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold">
            {page * LIMIT - 5}-{page * LIMIT}
          </span>{" "}
          of <span className="font-semibold">{totalPages * LIMIT}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-400 border border-gray-300 rounded-s-lg hover:text-white cursor-pointer disabled:cursor-not-allowed"
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>
          </li>

          <li>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-400 border border-gray-300 rounded-e-lg hover:text-white cursor-pointer disabled:cursor-not-allowed"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
