import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { contex } from "../../contex/ContexApi";
import toast, { Toaster } from "react-hot-toast";
import { allUsersAllBlogs } from "../../API/apiCall";
import Card from "../../components/card/Card";
import SearchBox from "../../components/searchBox/SearchBox";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
function UserHome() {
  const navigate = useNavigate();
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

    const serverData = await allUsersAllBlogs(header);
    setLoader(true);
    console.log(serverData);
    if (serverData.status == 200) {
      setAllBlogs(serverData.data.success);
      setLoader(false);
    } else if (serverData.response.data.error.name === "TokenExpiredError") {
      localStorage.removeItem("auth-token");
      setLoader(false);
      navigate("/login");
    } else if (serverData.message === "Network Error") {
      setLoader(false);
      toast.error("Internal Server Error");
    } else {
      toast.error(serverData.response.data.error);
      setLoader(false);
      navigate("/login");
    }
  }
  return (
    <Layout>
      <div className="my-[60px] flex flex-col">
        <div className="flex flex-col items-center md:flex-row gap-5 py-5">
          <SearchBox />
          <div>
            <p>Search by Categorie</p>
            <select className="border-2 rounded-lg  text-center ">
              {blogCategories &&
                blogCategories.map((blogCate, index) => {
                  return (
                    <option key={index} value={blogCate}>
                      {blogCate}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        {loader ? (
          <Loader />
        ) : allBlogs ? (
          <div className="flex flex-col gap-6">
            {allBlogs &&
              allBlogs.map((blog) => {
                return <Card key={blog._id} blog={blog} />;
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
