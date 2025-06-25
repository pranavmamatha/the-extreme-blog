import { Link } from "react-router-dom";

interface BlogCard {
  authorName: string;
  title: string;
  content: string;
  id: string
}

export function BlogCard({
  authorName,
  title,
  content,
  id
}: BlogCard) {
  return (
    <Link to={`/blog/oneBlog/${id}`}>
    <div className="border-b-2 border-slate-200 pb-4 mb-8">
      <div className="flex">
        <div className="flex justify-center flex-col">
          <Avatar name={authorName}  />
        </div>
        <div className="font-light pl-1 flex justify-center flex-col ml-2">
          {authorName}
        </div>
        <div className="font-thin text-[10px] pl-4 flex justify-center flex-col text-slate-500">
          &#9679;
        </div>
      </div>
      <div className="text-xl font-semibold pt-2">{title}</div>
      <div className="text-md font-thin">
        {content.length > 100 ? content.slice(0, 100) + "..." : content}
      </div>
      <div className="text-sm font-thin text-slate-500 pt-4">
        {Math.ceil(content.length / 100)} min read
      </div>
    </div>
    </Link>
  );
}

export function Avatar({ name }: { name: string | null }) {
  return (
    <div className={"relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-600"}>
      <span className="font-medium text-gray-300">{name!=null?name[0]:""}</span>
    </div>
  );
}
