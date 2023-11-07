import React, { useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import JoditEditor from "jodit-react";
import toast, { Toaster } from "react-hot-toast";

function CreateBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const editor = useRef(null);

  function submitData(e) {
    e.preventDefault();
    if (!title || !blogImage || !content) {
      toast.error("All fields are required ");
    } else {
      console.log(content);
    }
  }
  return (
    <Layout>
      <div className="mt-[70px] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-blue-600">Create Blog</h2>
        <form className="shadow-xl shadow-gray-400 p-3 rounded-lg ">
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title*</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-300 rounded-lg px-2 focus:outline-none"
              type="text"
              id="title"
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
          <div className="flex flex-col gap-1">
            <label htmlFor="image">Blog image*</label>
            <input
              onChange={(e) => setBlogImage(e.target.files[0])}
              type="file"
              id="image"
            />
          </div>
          <div className="py-3 text-center">
            <button
              onClick={(e) => submitData(e)}
              className="bg-blue-600 px-6 text-xl py-1 text-white rounded-lg hover:shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </Layout>
  );
}

export default CreateBlog;
