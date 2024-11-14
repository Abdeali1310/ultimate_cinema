/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import Loading from "../utils/Loading";
import noimage from "../assets/noimage.jpg";

function HorizontalCards({ data, title, detail }) {
  return data ? (
    <div className="w-full p-5">
      <div className="w-[110%] h-[50vh] flex overflow-y-hidden ">
        {data.map((d, i) => {
          return (
            <Link
              to={`/${d.media_type || title}/details/${d.id}`}
              key={i}
              className="min-w-[75%] md:min-w-[38%] lg:min-w-[32%] xl:min-w-[22%] w-[33vh]  rounded-lg mb-7 border-r-1 hover:shadow-lg duration-100 hover:shadow-[rgba(255,255,255,.3)] bg-zinc-900 mr-5"
            >
              <img
                src={
                  d.backdrop_path || d.profile_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/original${
                        d.backdrop_path || d.profile_path || d.poster_path
                      }`
                    : noimage
                }
                className="w-[55vh] rounded-md h-[70%] object-cover"
                alt=""
              />
              <h1 className="text-lg px-3 mt-3 font-serif font-black overflow-y-auto min-h-[3vh] max-h-[10vh] text-white">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              {detail == "no"
                ? "" : d.overview && (
                    <p className=" text-xs lg:text-md mt-3 mb-4 px-3 text-zinc-200">
                      {d.overview.slice(0, 35)}...
                      <Link className="text-zinc-400">more</Link>
                    </p>
                  )
                 }
              {detail == "no"
                ? "" :d.character && (
                <p className=" text-lg mt-1 mb-3 font-semibold px-3 text-zinc-400">
                  {d.character}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default HorizontalCards;
