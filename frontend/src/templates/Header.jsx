/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import ProfilePic from "../utils/Profilepic";
import { ToastContainer } from "react-toastify";

function Header({ data }) {
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    axios
      .get("https://ultimate-cinema-server.vercel.app/user/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        localStorage.setItem("user", response.data.user.username);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("profilePicUrl", response.data.user.profilePicUrl);

        setCurrentUser(response.data.user.username);
        console.log(response.data.user.username);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  const username = localStorage.getItem("user");
  const profilePicUrl = localStorage.getItem("profilePicUrl") || null;
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 0.8) 100%), 
        url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full h-[65vh] pb-12 relative flex flex-col  justify-end p-[6%] rounded-md"
    >
      <ToastContainer />
      <h1 className="md:w-[70%] text-3xl lg:text-4xl xl:text-5xl font-serif font-black text-white">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="md:w-[55%] text-lg md:text-xl mt-3 mb-3 text-white">
        {data.overview.slice(0, 200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <p className="text-white mb-10">
        <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
        {data.release_date ? data.release_date : <span>Not-Present</span>}
        <i className="text-yellow-500 ml-5 ri-album-fill"></i>{" "}
        {data.media_type ? data.media_type.toUpperCase() : "Unknown"}
      </p>

      <div className="trailer">
        <Link
          to={`${data.media_type}/details/${data.id}/trailer`}
          className="bg-[#6556cd] hover:bg-[#5547b2] w-[10%] mt-1 p-4 rounded text-white font-semibold"
        >
          <i classname="ri-play-fill"></i> Play Trailer
        </Link>
      </div>
      <div className="profile absolute z-50 right-2 top-2 lg:right-5 lg:top-2 text-white pb-3">
        <Link
          to={currentUser ? "/user/profile" : "/signin"}
          className="cursor-pointer"
        >
          {/* {currentUser ? (
            profilePicUrl && profilePicUrl !== "" ? (
              <img
                src={profilePicUrl}
                className="rounded-full h-16 w-16"
                alt="Profile"
              />
            ) : (
              <ProfilePic username={currentUser} />
            )
          ) : (
            <CgProfile className="text-white h-12 w-12" />
          )} */}

            {currentUser ? (profilePicUrl !== null ? <img src={profilePicUrl} className="md:h-16 md:w-16 h-12 w-12 rounded-full"/> : <ProfilePic  username={currentUser} />) : <CgProfile className="text-white h-12 w-12" />}

        </Link>
      </div>
    </div>
  );
}

export default Header;
