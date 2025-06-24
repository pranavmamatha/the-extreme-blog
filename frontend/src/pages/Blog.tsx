import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";

export function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) {
    return <div>loading....</div>;
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
