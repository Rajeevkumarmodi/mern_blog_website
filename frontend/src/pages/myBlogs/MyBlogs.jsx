import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { contex } from "../../contex/ContexApi";
import toast, { Toaster } from "react-hot-toast";
import { userBlogs } from "../../API/apiCall";
import MyBlogCard from "../../components/myBlogCard/MyBlogCard";
import Loader from "../../components/loader/Loader";
function UserHome() {
  const { isBlogCreated, setIsBlogCreated, blogCategories, loader, setLoader } =
    useContext(contex);
  const [allBlogs, setAllBlogs] = useState();
  if (isBlogCreated === true) {
    toast.success("Created Blog");
    setTimeout(() => setIsBlogCreated(false), 400);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const header = {
      "Content-Type": "multipart/form-data",
      auth_token: localStorage.getItem("auth-token"),
    };

    setLoader(true);
    const serverData = await userBlogs(header);
    console.log(serverData);
    if (serverData.message === "Network Error") {
      setLoader(false);
      toast.error("Internal Server Error");
    } else {
      setAllBlogs(serverData.data.success);
      setLoader(false);
    }
  }
  return (
    <Layout>
      <div className="my-[60px] flex  flex-col">
        <h2 className="text-center font-bold  mt-2 mb-4 text-2xl underline text-orange-600">
          My All Blogs
        </h2>
        {loader ? (
          <Loader />
        ) : allBlogs ? (
          <div className="flex flex-row flex-wrap gap-6">
            {allBlogs &&
              allBlogs.blogs.map((blog) => {
                return (
                  <MyBlogCard
                    key={blog._id}
                    blog={blog}
                    author={allBlogs.name}
                  />
                );
              })}
          </div>
        ) : (
          <h2 className="text-2xl font-bold text-center ">Blogs not found😒</h2>
        )}
      </div>
      <Toaster />
    </Layout>
  );
}

export default UserHome;
