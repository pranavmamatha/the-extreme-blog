import axios from "axios";
import { useEffect, useState } from "react";
const backend_url = import.meta.env.VITE_BACKEND_URL

interface Blog {
  title: string;
  content: string;
  id: string;
  authorId: string;
  author: {
    name: string;
  };
}

export function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${backend_url}/api/v1/book/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
}

export function useBlog({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>({title: "Title",
  content: "Content",
  id: "Id",
  authorId: "authorId",
  author: {
    name: "author"
  }});

  useEffect(() => {
    axios
      .get(`${backend_url}/api/v1/book/blog/oneBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
}