import axios from "axios";
import { useEffect, useState } from "react";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: { name: string };
}

const useBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>();

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const response = await axios.get("https://backend.itsnitzz00.workers.dev/api/v1/blog/bulk", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      setLoading(false);

      return response;
    };
    fetchAllBlogs().then((res) => {
      setBlogs(res.data);
    });
  }, []);

  return {
    loading,
    blogs,
  };
};

export default useBlogs;
