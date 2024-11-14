/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "../assets/noimage.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidenav from "../templates/Sidenav"; 

function Topnav() {
  const [query, setquery] = useState("");
  const [search, setSearch] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

  async function getSearches() {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearch(data.results);
    } catch (error) {
      console.log("Error = ", error);
    }
  }

  useEffect(() => {
    if (query) getSearches();
  }, [query]);

  return (
    <div className="relative w-full">
      {/* Hamburger Menu */}
     
      
      {/* Sidebar for Mobile/Tablet */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 left-0 w-3/4 h-full bg-zinc-800 p-5">
            <Sidenav />
            <button
              className="absolute top-4 right-4 text-2xl text-zinc-300"
              onClick={() => setIsSidebarOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Main Topnav Content */}
      <div className="navbar z-50 top-5 absolute w-full  left-14 xl:left-56 flex items-center gap-5 text-zinc-300">
      
        <i className="ri-search-line text-3xl"></i>
        <input
          type="search"
          className="px-5 outline-none border-none bg-transparent text-xl w-[24vh] md:w-full lg:w-[62vh] xl:w-full max-w-[70vh] h-[4.5vh] rounded-lg"
          name="search"
          id="search"
          placeholder="Search anything"
          onChange={(e) => setquery(e.target.value)}
          value={query}
        />

        {/* Query Box */}
        {query && (
          <div className="z-50 absolute w-[88%] md:w-[76%] xl:w-[43%] mt-1 max-h-[50vh] left-[-2%] md:left-[7%] xl:left-[3%] bg-zinc-300 top-[90%] rounded-md overflow-auto">
            {search.map((item, index) => (
              <Link
                to={`/${item.media_type}/details/${item.id}`}
                key={index}
                className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 p-4 border-b flex items-center"
              >
                <img
                  className="w-[10vh] h-[10vh] rounded-lg object-cover mr-5"
                  src={
                    item.backdrop_path || item.profile_path
                      ? `https://image.tmdb.org/t/p/original${item.backdrop_path || item.profile_path}`
                      : noimage
                  }
                  alt=""
                />
                <span>
                  {item.name || item.title || item.original_name || item.original_title}
                </span>
              </Link>
            ))}
          </div>
        )}
        
      </div>
      
    </div>
    
  );
}

export default Topnav;
