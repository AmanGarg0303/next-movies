import { Trash2Icon, ViewIcon } from "lucide-react";

export const CategoriesList = () => {
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
            <th scope="col" className="px-6 py-3">
              Movie Count
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-900">
            <td className="px-6 py-4">vhreGBPUR</td>
            <td className="px-6 py-4">Documentry</td>
            <td className="px-6 py-4">24</td>
            <td className="px-6 py-4">10-09-2023</td>
            <td className="px-6 py-4 flex gap-x-3 items-center">
              <Trash2Icon className="w-5 text-red-500 cursor-pointer" />
              <ViewIcon className="w-5 text-yellow-500 cursor-pointer" />
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-900">
            <td className="px-6 py-4">vhreGBPUR</td>
            <td className="px-6 py-4">Heist</td>
            <td className="px-6 py-4">14</td>
            <td className="px-6 py-4">05-09-2024</td>
            <td className="px-6 py-4 flex gap-x-3 items-center">
              <Trash2Icon className="w-5 text-red-500 cursor-pointer" />
              <ViewIcon className="w-5 text-yellow-500 cursor-pointer" />
            </td>
          </tr>
        </tbody>
      </table>

      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span className="font-semibold">1-10</span> of{" "}
          <span className="font-semibold">1000</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <span className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-400 border border-gray-300 rounded-s-lg hover:text-white cursor-pointer">
              Previous
            </span>
          </li>

          <li>
            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-400 border border-gray-300 rounded-e-lg hover:text-white cursor-pointer">
              Next
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};
