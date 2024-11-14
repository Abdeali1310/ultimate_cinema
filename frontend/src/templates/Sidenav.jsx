/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { MdPrivacyTip } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
function Sidenav() {
  return (
    <div className="xl:w-[20%] h-full px-5 py-7 border-r-[1px] hidden lg:block border-zinc-600">
      <div className="logo flex gap-3 text-[26px]">
        <Link>
          {" "}
          <i className="ri-movie-line text-[#6556cd]"></i>
        </Link>
        <Link className=" font-serif text-white font-semibold">The Ultimate Cinema</Link>
      </div>
      <div className="new-feed  px-5">
        <h1 className=" text-white font-medium text-2xl mt-10 mb-7">New Feed</h1>

        {/* links */}
        <div className="links flex flex-col gap-3 mb-5 text-zinc-400 ">
          <Link to={"/trending"} className="flex text-xl rounded-lg duration-300 p-3 hover:bg-[#6556cd] hover:text-white">
            <i className="mr-3 ri-fire-fill"></i>
            <h1>Trending</h1>
          </Link>
          <Link to={"/popular"} className="flex text-xl rounded-lg duration-300 p-3 hover:bg-[#6556cd] hover:text-white">
            <i className="mr-3 ri-bard-fill"></i>
            <h1>Popular</h1>
          </Link>
          <Link to={"/movies"} className="flex text-xl rounded-lg duration-300 p-3 hover:bg-[#6556cd] hover:text-white">
            <i className="mr-3 ri-movie-fill"></i>
            <h1>Movies</h1>
          </Link>
          <Link to={"/tvshows"} className="flex text-xl rounded-lg duration-300 p-3 hover:bg-[#6556cd] hover:text-white">
            <i className="mr-3 ri-tv-fill"></i>
            <h1>TV Shows</h1>
          </Link>
          <Link to={"/people"} className="flex text-xl rounded-lg duration-300 p-3 hover:bg-[#6556cd] hover:text-white">
            <i className="mr-3 ri-team-fill"></i>
            <h1>People</h1>
          </Link>
        </div>
        <hr className="bg-zinc-600  h-[1px] border-none"/>
        {/* site info */}
        <div className="flex flex-col gap-3">
          <h1 className=" font-medium text-white text-2xl mt-10 mb-5">
            Website Information
          </h1>
          <Link to={"/about"} className=" text-zinc-400 flex text-xl rounded-lg duration-300 p-3 hover:bg-[#6556cd] hover:text-white">
            <i className="mr-3 ri-information-fill"></i>
            <h1>About</h1>
          </Link>
          <Link to={'/contact'} className=" text-zinc-400 flex text-xl rounded-lg duration-300 p-3 hover:bg-[#6556cd] hover:text-white">
            <i className="mr-3 ri-phone-fill"></i>
            <h1>Contact Us</h1>
          </Link>
          <Link to={'/privacy'} className=" text-zinc-400 flex text-xl items-center rounded-lg duration-300 p-3 hover:bg-[#6556cd] hover:text-white">
            <div className="privacy mr-3 "><MdPrivacyTip /></div>
            <h1>Privacy Policy</h1>
          </Link>
          <Link to={'/terms'} className=" text-zinc-400 flex gap-3 text-xl items-center rounded-lg duration-300 p-3 hover:bg-[#6556cd] hover:text-white">
            <MdEditDocument />
            <h1>Terms & Conditions</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
