import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Blog from "./components/Blog";
import Auth from "./components/Auth";
import CreateBlog from "./components/CreateBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Auth authType="Signup" />}></Route>
        <Route path="/signin" element={<Auth authType="Signin" />}></Route>
        <Route path="/blog/create" element={<CreateBlog />}></Route>
        <Route path="/blog/:id" element={<Blog />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
