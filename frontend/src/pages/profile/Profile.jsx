import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import avatar from "../../../public/avatar.png";
import { singleUser } from "../../API/apiCall";
import { contex } from "../../contex/ContexApi";
import Loader from "../../components/loader/Loader";
import {
  AiOutlineMail,
  AiOutlineComment,
  AiOutlineNumber,
} from "react-icons/ai";
import { FaBlogger } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { RxAvatar } from "react-icons/rx";
import { BsCalendarCheck } from "react-icons/bs";
import toast from "react-hot-toast";

function Profile() {
  const { loader, setLoader } = useContext(contex);
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const header = {
      auth_token: localStorage.getItem("auth-token"),
      "Content-Type": "application/json",
    };

    setLoader(true);
    const serverData = await singleUser(header);
    if (serverData.status === 200) {
      setUserData(serverData.data.success);
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
      <div>
        <h2 className="text-center py-4 text-3xl font-bold">Profile</h2>
        {loader ? (
          <Loader />
        ) : (
          <div>
            {userData ? (
              <div className="flex flex-col items-center gap-3 shadow-lg shadow-gray-400 rounded-lg p-6">
                <div>
                  <img className="w-[150px]" src={avatar} alt="" />
                  <p className="flex items-center gap-2">
                    <span>
                      <RxAvatar className="text-3xl" />
                    </span>
                    <span className=" font-bold text-blue-600">
                      Name : {userData.name}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="flex items-center gap-2">
                    <span>
                      <AiOutlineMail className="text-3xl" />
                    </span>
                    <span>Email : {userData.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>
                      <AiOutlineNumber className="text-3xl" />
                    </span>
                    <span>ID : {userData._id}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>
                      <FaBlogger className="text-3xl" />
                    </span>
                    <span>Total Blogs : {userData.blogs.length}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>
                      <FcLike className="text-3xl" />
                    </span>
                    <span>
                      Total Favourite Blogs : {userData.favourites.length}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>
                      <BsCalendarCheck className="text-3xl" />
                    </span>
                    <span>
                      Account created date : {userData.createdAt.split("T")[0]}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <h2>User not found</h2>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Profile;
