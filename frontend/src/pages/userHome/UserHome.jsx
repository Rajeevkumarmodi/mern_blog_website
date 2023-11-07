import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { contex } from "../../contex/ContexApi";
import toast, { Toaster } from "react-hot-toast";
import { allBlogs } from "../../API/apiCall";

function UserHome() {
  const { isBlogCreated, setIsBlogCreated } = useContext(contex);
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

    const data = await allBlogs(header);
    console.log(data);
  }
  return (
    <Layout>
      this is home page
      <Toaster />
    </Layout>
  );
}

export default UserHome;
