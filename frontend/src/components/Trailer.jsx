/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import NotFound from "../utils/NotFound";

function Trailer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="absolute z-[100] top-10 ml-20 right-4 w-[85%] md:w-[80%] lg:w-[85%] mr-4 xl:mr-16 h-[30%] md:h-[50%] lg:h-[80%] rounded-2xl bg-[rgba(0,0,0,0.9)]">
      {/* Close button */}
      <Link
        onClick={() => navigate(-1)}
        className="text-3xl  sm:text-4xl md:text-5xl text-zinc-400 absolute top-[-3%] right-[-3%] hover:text-[#6556cd]"
      >
        &times;
      </Link>
      
      {/* ReactPlayer or NotFound */}
      {ytvideo ? (
        <ReactPlayer
          controls
          width="100%"
          height="100%"
          className="rounded-2xl"
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Trailer;
