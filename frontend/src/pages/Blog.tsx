import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import {BlogSkeleton} from "../components/BlogSkeleton"

export function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) {
    return <div>
      <Appbar />
      <div className="flex justify-center flex-col ">
        <div className="px-20">

        <BlogSkeleton />
        </div>
      </div>
      </div>;
  }
  return (
    <div>
    <Appbar />
      <FullBlog
        authorName={blog.author.name}
        title={blog.title}
        content={blog.content}
      />
    </div>
  );
}
