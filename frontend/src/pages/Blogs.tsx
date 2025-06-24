import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
export function Blogs() {
  const {loading, blogs} = useBlogs();

  if(loading){
    return <div>loading...</div>
  }



  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-sm lg:max-w-2xl">
          {blogs.map(blog=>{
            return <BlogCard authorName={blog.author.name} title={blog.title} content={blog.content} id={blog.id}/>
          })}
        </div>
      </div>
    </div>
  );
}
