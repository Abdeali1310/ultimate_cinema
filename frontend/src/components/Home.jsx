/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidenav from "../templates/Sidenav";
import Topnav from "../templates/Topnav";
import axios from "../utils/axios";
import Header from "../templates/Header";
import HorizontalCards from "../templates/HorizontalCards";
import Dropdown from "../templates/Dropdown";
import Loading from "../utils/Loading";
import Footer from "../templates/Footer";

function Home() {
  document.title = "The Ultimate Cinema | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      // console.log(data.results);

      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];

      setWallpaper(randomData);
    } catch (error) {
      console.log("Error = ", error);
    }
  };

  const getTrendingData = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/week`);

      setTrending(data.results);
    } catch (error) {
      console.log("Error = ", error);
    }
  };

  useEffect(() => {
    getTrendingData();
    !wallpaper && getHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <>
    <Sidenav />
      
      <div className="w-[100%] lg:w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between p-8">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
        <div className="footer lg:hidden">

        <Footer />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
