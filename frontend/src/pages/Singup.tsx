import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";
import { checklogin } from "../components/checkLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();
  if (checklogin()) {
    useEffect(() => {
      navigate("/blogs");
    }, []);
  }
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signup" />
        </div>
        <div className="invisible lg:visible">
          <Quote />
        </div>
      </div>
    </div>
  );
}
