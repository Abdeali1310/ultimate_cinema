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

function Movie() {
  const [movie, setMovie] = useState([]);
  const [category, setCategory] = useState("now_playing");
const [hasmore,setHasmore] = useState(true);

  const [pages,setPages] = useState(1);
  const navigate = useNavigate();

  const getMovieData = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${pages}`);
      if(data.results.length > 0 ){

        setMovie(((prev)=>[...prev,...data.results]));
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
    if(movie.length === 0){
      getMovieData();
    }
    else{
      setPages(1);
      setMovie([]);
      getMovieData();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category]);

  document.title = "The Ultimate Cinema | Movie | "+category.toLocaleUpperCase()
  return movie ? (
    <div className="min-h-screen w-screen py-4 ">
      <div className="top mb-12 flex justify-between px-[3%] items-center  text-zinc-300">
        <div className="flex  gap-4 img-heading">
          <img
            onClick={() => navigate(-1)}
            className=" hover:bg-[#6556cd] rounded-2xl cursor-pointer"
            src={arrow}
            alt=""
          />
          <h1 className="text-3xl font-semibold text-zinc-400">Movie</h1>{" "}
        </div>
        <div className="absolute top-3 left-[25%]">
        <Topnav />

        </div>
        <div className="dropdown flex items-center gap-5 mt-2 mr-[3%]">
          <Dropdown
            title="Category"
            options={["popular", "top_rated","upcoming","now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />
          
        </div>
      </div>
      <InfiniteScroll
        dataLength={movie.length}
        next={getMovieData}
        hasMore={hasmore}
        loader={<Loading />}
      >
        <Cards data={movie} title="movie"/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movie;
