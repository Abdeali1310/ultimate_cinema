/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import arrow from "../assets/arrow.svg";
import { useNavigate } from "react-router-dom";
import Topnav from "../templates/Topnav";
import Dropdown from "../templates/Dropdown";
import Cards from "../templates/Cards";
import axios from "../utils/axios";
import Loading from "../utils/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Tvshows() {
  const [tvshows, setTvshows] = useState([]);
  const [category, setCategory] = useState("airing_today");
const [hasmore,setHasmore] = useState(true);

  const [pages,setPages] = useState(1);
  const navigate = useNavigate();

  const getTvshowsData = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${pages}`);
      if(data.results.length > 0 ){

        setTvshows(((prev)=>[...prev,...data.results]));
        setPages(pages+1)
      }else{
        setHasmore(false);
      }

      
    } catch (error) {
      console.log("Error = ", error);
    }
  };

  

  //refresh handler
  const refreshHandler = async()=>{
    if(tvshows.length === 0){
      getTvshowsData();
    }
    else{
      setPages(1);
      setTvshows([]);
      getTvshowsData();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category]);

  document.title = "The Movie DB | tvshows | "+category.toLocaleUpperCase()
  return tvshows ? (
    <div className="min-h-screen w-screen py-4 ">
      <div className="top mb-12 flex justify-between px-[3%] items-center  text-zinc-300">
        <div className="flex  gap-4 img-heading">
          <img
            onClick={() => navigate(-1)}
            className=" hover:bg-[#6556cd] rounded-2xl cursor-pointer"
            src={arrow}
            alt=""
          />
          <h1 className="text-3xl font-semibold text-zinc-400">tvshows</h1>{" "}
        </div>
        <div className="absolute top-3 left-[25%]">
        <Topnav />

        </div>
        <div className="dropdown flex items-center gap-5 mt-2 mr-[3%]">
          <Dropdown
            title="Category"
            options={["top_rated", "on_the_air","popular","airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
          
        </div>
      </div>
      <InfiniteScroll
        dataLength={tvshows.length}
        next={getTvshowsData}
        hasMore={hasmore}
        loader={<Loading />}
      >
        <Cards data={tvshows} title="tv"/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Tvshows;
