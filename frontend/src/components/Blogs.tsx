import { Link } from "react-router-dom";
import useBlogs, { Blog } from "../hooks/useBlogs";
import Bookmark from "../icons/Bookmark";
import Plus from "../icons/Plus";
import Remove from "../icons/Remove";
import Header from "./Header";

export default function Blogs() {
  const { loading, blogs } = useBlogs();

  function getInitials(authorName: string) {
    const authorNameList = authorName.split(/[ .]+/);
    const initials = authorNameList.reduce((acc, ele) => {
      return acc + ele[0].toUpperCase();
    }, "");

    return initials;
  }

  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <Header />
      <section className="py-2 px-5 md:py-12 md:px-24">
        <nav className="flex gap-5 border-b-2 border-gray-100  text-gray-500">
          <Plus />
          <p className="border-b-2 pb-4 border-slate-950">For You</p>
          <p className="pb-4">Following</p>
        </nav>
        {blogs?.length &&
          blogs.map((blog: Blog) => {
            return (
              <Link to={`/blog/${blog.id}`}>
                <div key={blog.id} className="py-10 flex justify-between gap-5 border-b-2 border-gray-100">
                  <div className="basis-/712">
                    <div className="flex gap-2 mb-1  items-center">
                      <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400">
                        <span className="text-xs text-gray-500 dark:text-gray-300">
                          {getInitials(blog.author.name)}
                        </span>
                      </div>
                      <p>{blog.author.name}</p>
                      <span className="text-xs text-gray-400">&#9679;</span>
                      <p className="text-gray-400">Dec 3, 2023</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-2xl mb-2">{blog.title}</h2>
                      <p className="mb-8">{blog.content}</p>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-4 text-gray-500">
                        <span className="bg-gray-200 rounded-full py-1 px-2 text-gray-600 text-sm font-medium">
                          side Hustle
                        </span>
                        <span>3 min read</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Bookmark classes="w-5 h-5 text-gray-500" />
                        <Remove classes="w-5 h-5 text-gray-500" />
                        <span className="text-xl font-bold mb-3 inline-block text-gray-500">...</span>
                      </div>
                    </div>
                  </div>
                  <div className="basis-5/12 hidden md:block"></div>
                </div>
              </Link>
            );
          })}
      </section>
    </>
  );
}
