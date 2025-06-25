import { useState } from "react";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom";
import { checklogin } from "../components/checkLogin";
import { useEffect } from "react";


export function Publish() {
  const navigate = useNavigate()
  if (!checklogin()){
    console.log(checklogin())
    useEffect(()=>{
      navigate("/signin")
    }, [])
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function onClick() {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post(
        `${backend_url}/api/v1/book/blog/post`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.message === "post uploaded successfully") {
        navigate(`/blog/oneblog/${response.data.id}`);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Appbar />
      <div className="px-20">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-5xl rounded-lg block w-full p-2.5 mb-4"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Title"
          value={title}
        />
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <textarea
            id="comment"
            rows={4}
            className="w-full h-100 p-5 text-xl text-gray-900 bg-white border-0 rounded-lg"
            placeholder="Content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>

        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
            Failed to publish the post. Please try again.
          </div>
        )}

        <button
          type="button"
          onClick={()=>{
            onClick()
          }
          }
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 cursor-pointer mr-8"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
