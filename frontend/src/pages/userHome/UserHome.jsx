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
  const [allBlogs, setAllBlogs] = useState([]);
  const [categorie, setCategorie] = useState("All");
  const [searchText, setSearchText] = useState("");
  if (isBlogCreated === true) {
    toast.success("Created Blog");
    setTimeout(() => setIsBlogCreated(false), 400);
  }

  // header
  const header = {
    "Content-Type": "multipart/form-data",
    auth_token: localStorage.getItem("auth-token"),
  };

  useEffect(() => {
    const setTime = setTimeout(() => {
      fetchBlogs();
    }, 1000);
    return () => clearTimeout(setTime);
  }, [categorie, searchText]);

  // search text value

  function searchValue(e) {
    setSearchText(e.target.value);
  }

  async function fetchBlogs() {
    const serverData = await allUsersAllBlogs(header, categorie, searchText);
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
    }
  }
  return (
    <Layout>
      <div className="my-[60px] flex flex-col items-center">
        <div className="flex flex-col items-center md:flex-row gap-5 py-5">
          <SearchBox searchValue={searchValue} />
          <div>
            <p>Search by Categorie</p>
            <select
              onChange={(e) => setCategorie(e.target.value)}
              className="border-2 rounded-lg  text-center "
            >
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
        ) : allBlogs.length > 0 ? (
          <div className="flex justify-center space-x-4 space-y-4 flex-wrap gap-6">
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
