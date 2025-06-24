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
          <BlogCard
            authorName={"Pranav R"}
            title="How an Ugly Single-Page Website Makes $5,000 a   Month with Affiliate Marketing"
            content="Making money online is the dream for many people, but when you start, you realize there is a lot to do. Such as creating the logo, building a landing page, writing the USP (unique selling proposition), and more."
            publishedDate="2nd Feb 2024"
          />{" "}
        </div>
      </div>
    </div>
  );
}
