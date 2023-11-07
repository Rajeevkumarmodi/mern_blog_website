import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import { contex } from "../../contex/ContexApi";
import toast, { Toaster } from "react-hot-toast";

function UserHome() {
  const { isBlogCreated, setIsBlogCreated } = useContext(contex);
  if (isBlogCreated === true) {
    toast.success("Created Blog");
    setTimeout(() => setIsBlogCreated(false), 400);
  }
  return (
    <Layout>
      this is home page
      <Toaster />
    </Layout>
  );
}

export default UserHome;
