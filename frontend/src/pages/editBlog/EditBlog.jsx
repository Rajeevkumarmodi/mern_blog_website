import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import JoditEditor from "jodit-react";
import ReactHtmlParser from "react-html-parser";
import toast, { Toaster } from "react-hot-toast";
import { editSingleBlog, singleBlog } from "../../API/apiCall";
import Loader from "../../components/loader/Loader";
import { contex } from "../../contex/ContexApi";
import { useNavigate, useParams } from "react-router-dom";
function CreateBlog() {
  const { id } = useParams();
  const { loader, setLoader, blogCategories, setIsEditBlog } =
    useContext(contex);

  // useState

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [editBlogImage, setEditBlogImage] = useState("");
  const [blogCategorie, setBlogCategorie] = useState("");
  const editor = useRef(null);

  const navigate = useNavigate();

  // call single blog

  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  // header
  const header = {
    "Content-Type": "multipart/form-data",
    auth_token: localStorage.getItem("auth-token"),
  };

  // fetchSingleBlog function

  async function fetchSingleBlog() {
    setLoader(true);
    const serverData = await singleBlog(id, header);
    console.log(serverData);
    if (serverData.status === 200) {
      setLoader(false);
      setTitle(serverData && serverData.data.success.title);
      setContent(serverData && serverData.data.success.description);
      setBlogImage(serverData && serverData.data.success.blogImage);
      setBlogCategorie(serverData && serverData.data.success.category);
    } else {
      setLoader(false);
      toast.error(serverData.response.data.error);
    }
  }

  //   edit blog

  async function editBlog(e) {
    e.preventDefault();
    if (!title || !blogImage || !content || !blogCategorie) {
      toast.error("All fields are required ");
    } else if (blogCategorie === "All") {
      toast.error("Please select valid categorie ");
    } else {
      const data = new FormData();
      data.append("title", title);
      data.append("description", content);
      data.append("blogImage", editBlogImage ? editBlogImage : blogImage);
      data.append("category", blogCategorie);

      setLoader(true);
      const serverData = await editSingleBlog(data, header, id);
      console.log(serverData);
      if (serverData.status == 200) {
        navigate("/myblogs");
        setIsEditBlog(true);
      } else if (serverData.response.data.error.name === "TokenExpiredError") {
        localStorage.removeItem("auth-token");
        setLoader(false);
        navigate("/login");
      } else if (serverData.message == "Network Error") {
        toast.error("Internal Server error");
        setLoader(false);
      } else if (serverData.response.status === 404) {
        setLoader(false);
        toast.error(serverData.response.data.error);
      }
    }
  }
  return (
    <Layout>
      <div className="mt-[70px] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-blue-600">Edit Blog</h2>
        <form className="shadow-xl shadow-gray-400 p-3 rounded-lg ">
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title*</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-300 rounded-lg px-2 focus:outline-none"
              type="text"
              id="title"
              value={title}
              placeholder="Enter title"
            />
          </div>
          <div className="py-2">
            <p>Description*</p>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <div className="flex flex-col gap-1">
              <label htmlFor="image">Blog image*</label>
              <input
                onChange={(e) => setEditBlogImage(e.target.files[0])}
                type="file"
                id="image"
              />
            </div>
            <div>
              <p>Blog Categorie*</p>
              <select
                onChange={(e) => setBlogCategorie(e.target.value)}
                className="text-center border-2 border-gray-400 rounded-lg py-1"
              >
                {blogCategories &&
                  blogCategories.map((categ, index) => {
                    return (
                      <option key={index} value={categ}>
                        {categ}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="py-3 text-center">
            <button
              onClick={(e) => editBlog(e)}
              className="bg-blue-600 px-6 text-xl py-1 text-white rounded-lg hover:shadow-lg"
            >
              {loader ? <Loader /> : "Edit"}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </Layout>
  );
}

export default CreateBlog;
