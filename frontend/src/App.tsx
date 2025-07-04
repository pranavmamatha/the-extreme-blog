import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Signup} from "./pages/Singup"
import {Signin} from "./pages/Signin"
import {Blog} from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import {Publish} from "./pages/Publish"

function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blogs/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/blog/oneBlog/:id" element={<Blog/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/publish" element={<Publish/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;