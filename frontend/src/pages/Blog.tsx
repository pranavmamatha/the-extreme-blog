import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import {BlogSkeleton} from "../components/BlogSkeleton"
import { checklogin } from "../components/CheckLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export function Blog() {
    const navigate = useNavigate()
  if (!checklogin()){
    console.log(checklogin())
    useEffect(()=>{
      navigate("/signup")
    }, [])
  }

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
