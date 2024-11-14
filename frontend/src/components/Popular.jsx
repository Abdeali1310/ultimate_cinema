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

function Popular() {
  const [popular, setPopular] = useState([]);
  const [category, setCategory] = useState("tv");
const [hasmore,setHasmore] = useState(true);

  const [pages,setPages] = useState(1);
  const navigate = useNavigate();

  const getPopularData = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${pages}`);
      if(data.results.length > 0 ){

        setPopular(((prev)=>[...prev,...data.results]));
        setPages(pages+1)
      }else{
        setHasmore(false);
      }
    console.log(data.results);
    
      
    } catch (error) {
      console.log("Error = ", error);
    }
  };

  

  //refresh handler
  const refreshHandler = async()=>{
    if(popular.length === 0){
      getPopularData();
    }
    else{
      setPages(1);
      setPopular([]);
      getPopularData();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category]);

  document.title = "The Ultimate Cinema | Popular | "+category.toLocaleUpperCase()
  return popular ? (
    <div className="min-h-screen w-screen py-4 ">
      <div className="top mb-12 flex justify-between px-[3%] items-center  text-zinc-300">
        <div className="flex  gap-4 img-heading">
          <img
            onClick={() => navigate(-1)}
            className=" hover:bg-[#6556cd] rounded-2xl cursor-pointer"
            src={arrow}
            alt=""
          />
          <h1 className="text-3xl font-semibold text-zinc-400">Popular</h1>{" "}
        </div>
        <div className="absolute top-3 left-[25%]">
        <Topnav />

        </div>
        <div className="dropdown flex items-center gap-5 mt-2 mr-[3%]">
          <Dropdown
            title="Category"
            options={["movie", "tv",]}
            func={(e) => setCategory(e.target.value)}
          />
          
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopularData}
        hasMore={hasmore}
        loader={<Loading />}
      >
        <Cards data={popular} title={category}/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular;
