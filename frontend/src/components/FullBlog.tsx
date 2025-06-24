import { Avatar } from "./BlogCard";

interface BlogCard {
  authorName: string;
  title: string;
  content: string;
}

export function FullBlog({ authorName, title, content }: BlogCard) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-12 px-20 w-full max-w-screen-2xl">
        <div className="col-span-8">
          <div className="text-5xl font-extrabold">{title}</div>
          <div className="text-slate-500 pt-3">Posted on 24th June 2025</div>
          <div className="pt-5">{content}</div>
        </div>
        <div className="col-span-4 pl-20">
          <div className="font-semibold text-slate-700">
            Author
          </div>
          <div className="flex pt-4">
            <div className="flex justify-center flex-col">{<Avatar name={authorName} />}</div>
            <div className="pl-4">
                <div className="text-2xl font-bold">{authorName}</div>
                <div className="text-slate-500">Master of mirth, purveyor of puns, and the funniest person in the kingdom.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
