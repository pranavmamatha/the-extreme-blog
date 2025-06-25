import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "@thisispranav/the-extreme-blog-common";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL

export function Auth({ type }: { type: "signup" | "signin" }) {
  const  [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  async function sendRequest() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backend_url}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInput
      );
      let jwt = response.data;
      localStorage.setItem("token", jwt.token);
      localStorage.setItem("name", jwt.name);
      setLoading(false);
      navigate("/blogs");
    } catch (e) {
      //alert the user here that the request failed
      console.log("failed");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10 text-center">
            <div className="text-3xl font-extrabold">
              {type === "signup" ? "Create a account" : "Login here"}
            </div>
            <div className="text-slate-500">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have a account yet?"}
              <Link
                to={type === "signup" ? "/signin" : "/signup"}
                className="pl-2 underline"
              >
                {type === "signup" ? "Login" : "Signup"}
              </Link>
            </div>
          </div>
          <div className="pt-3">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="John Doe"
                onChange={(e) => {
                  setPostInput({
                    ...postInput,
                    name: e.target.value,
                  });
                }}
                type={"text"}
              />
            ) : (
              ""
            )}
            <LabelledInput
              label="Email"
              placeholder="johndoe@xmail.com"
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  email: e.target.value,
                });
              }}
              type={"text"}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8 cursor-pointer"
            >
              {loading? (type === "signin" ? "Singing in..." : "Signing up....") :(type === "signin" ? "Sing in" : "Sign up")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mt-4 mb-1 text-sm font-semibold x-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
