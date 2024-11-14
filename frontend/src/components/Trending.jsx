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

function Trending() {
  
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
const [hasmore,setHasmore] = useState(true);

  const [pages,setPages] = useState(1);
  const navigate = useNavigate();

  const getTrendingData = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${pages}`);
      if(data.results.length > 0 ){

        setTrending(((prev)=>[...prev,...data.results]));
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
    if(trending.length === 0){
      getTrendingData();
    }
    else{
      setPages(1);
      setTrending([]);
      getTrendingData();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);
  document.title = "The Ultimate Cinema | Trending | "+category.toLocaleUpperCase()

  return trending ? (
    <div className="min-h-screen w-screen py-4 ">
      <div className="top mb-12 flex justify-between px-[3%] items-center  text-zinc-300">
        <div className="flex  gap-4 img-heading"> 
          <img
            onClick={() => navigate(-1)}
            className=" hover:bg-[#6556cd] rounded-2xl cursor-pointer"
            src={arrow}
            alt=""
          />
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>{" "}
        </div>
        <Topnav />
        <div className="dropdown flex items-center gap-5 mt-2 mr-[3%]">
          <Dropdown
            title="Category"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <Dropdown
            title="Duration"
            options={["day", "week"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrendingData}
        hasMore={hasmore}
        loader={<Loading />}
      >
        <Cards data={trending} title={category}/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
