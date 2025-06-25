import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
export function Appbar() {
  return (
    <div className="border-b border-slate-300 flex justify-between px-10 py-3 mb-10">
      <div className="flex justify-center flex-col">
        <Link to={"/blogs"}>
          <div className="text-2xl font-normal">
            e<span className="font-extrabold">X</span>treme
          </div>
        </Link>
      </div>

      <div className="pt-2">
        <div>
          <Link to={"/publish"}>
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 cursor-pointer mr-8"
            >
              New
            </button>
          </Link>

          <Avatar name={"P"} />
        </div>
      </div>
    </div>
  );
}
