"use client";
import { Trash2Icon, ViewIcon } from "lucide-react";
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

      // setMovies([...movies, ...data.data]);
      setCategories(data.data);
    };

    fetchData();
  }, [page]);

  return (
    <div className="relative overflow-x-auto">
      <div className="mb-4">
        <div className="flex gap-x-2 items-center border border-gray-300 w-[20rem] rounded-sm py-1">
          <span className="ml-3">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>

          <input
            type="text"
            placeholder="Search..."
            className="outline-none px-2 py-1 bg-transparent w-full text-sm text-gray-200"
          />
        </div>
      </div>

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
                <Trash2Icon className="w-5 text-red-500 cursor-pointer" />
                <ViewIcon className="w-5 text-yellow-500 cursor-pointer" />
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
