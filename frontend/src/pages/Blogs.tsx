import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export function Blogs() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />

        <div className="flex justify-center">
          <div className="w-screen px-98">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-sm lg:max-w-2xl">
          {blogs.map((blog) => {
            return (
              <BlogCard
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                id={blog.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
