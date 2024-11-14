/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import Loading from "../utils/Loading";
import HorizontalCards from "../templates/HorizontalCards";
import noimage from "../assets/noimage.jpg";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import RatingReviewForm from "../pages/RatingReview";
import Reviews from "../pages/Reviews";
import ProfilePic from "../utils/Profilepic";
import { CgProfile } from "react-icons/cg";
import { TiTick } from "react-icons/ti";

function TVDetails() {
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = localStorage.getItem("user");
  const [isClicked, setIsClicked] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    fetchWatchList();
    fetchWatched();

    //imp
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  // console.log(info);
  document.title = "The Ultimate Cinema" + " | TV | " + id;
  //watchlist
  async function fetchWatchList() {
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.get(
        `https://ultimate-cinema-server.vercel.app/tv/add/${id}/user/${userId}`,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        setIsInWatchlist(true); // Ensure state is set on successful request
      }
    } catch (error) {
      console.log("Error while fetching watchlist", error);
      setIsInWatchlist(false);
    }
  }

  //watched
  async function fetchWatched() {
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.get(
        `https://ultimate-cinema-server.vercel.app/user/`,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setIsWatched(res.data.user.tvWatched)
      // console.log(res.data.user.tvWatched);
      
    } catch (error) {
      console.log("Error while fetching watchlist", error);
      setIsInWatchlist(false);
    }
  }
  //watch later
  async function handleWatchLater() {
    setIsClicked(true);

    try {
      console.log("Added to watchlist");
      const userId = localStorage.getItem("userId");
      const res = await axios.post(
        `https://ultimate-cinema-server.vercel.app/tv/add/${id}/user/${userId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        toast.success("Added to your Watchlist!");
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.log("Error adding to watchlist:", error);
      toast.error("Failed to add to Watchlist");
      setIsClicked(false);
    }
  }
  const profilePicUrl = localStorage.getItem("profilePicUrl") || null;

  return info ? (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 0.8) 100%), 
      url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="h-auto w-screen overflow-auto relative px-[10%]"
      >
        <ToastContainer />

        {/* part 1 navigation */}
        <nav className="w-full text-zinc-200 h-[10vh] items-center flex gap-7 md:gap-12 text-2xl">
          <Link
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556cd] ri-arrow-left-line "
          />

          <a
            className="hover:text-[#6556cd]"
            target="_blank"
            href={info.detail.homepage}
          >
            <i className="ri-external-link-fill"></i>
          </a>
          <a
            className="hover:text-[#6556cd]"
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-global-line"></i>
          </a>
          <a
            className="hover:text-[#6556cd] font-mono"
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          >
            imdb
          </a>
        </nav>

        {/* part 2 poster */}
        <div className="flex mt-7 xl:h-[56vh]  items-center justify-center flex-wrap lg:flex-nowrap gap-10">
          <img
            src={`https://image.tmdb.org/t/p/original${info.detail.backdrop_path}`}
            className="w-[32vh] h-[45vh] rounded-md   object-cover"
            alt=""
          />

          <div className="details ml-2 overflow-hidden flex flex-col gap-2 text-white">
            <div className="title w-auto">
              <h1 className="text-3xl lg:text-5xl font-bold font-serif">
                {info.detail.name}{" "}
                <span className="text-xl lg:text-2xl font-sans">
                  {" "}
                  ({info.detail.first_air_date.split("-")[0]})
                </span>
              </h1>
            </div>

            <div className="type flex gap-10">
              <p className="text-md font-semibold text-xl">
                TMDB -{" "}
                {info.detail.vote_average &&
                  info.detail.vote_average.toFixed(1) + "/10"}
              </p>
              <p className="text-md font-semibold text-xl">
                <i classname="ri-calendar-line"></i>{" "}
                {info.detail.first_air_date &&
                  info.detail.first_air_date.split("-")[0]}
                &nbsp; - &nbsp;
                {info.detail.last_air_date
                  ? info.detail.last_air_date.split("-")[0]
                  : "Present"}
              </p>
            </div>
            <div className="genre mt-1 flex gap-5">
              <p className="text-lg font-semibold">
                {info.detail.genres.map((g) => g.name).join(", ")}
              </p>
              {info.detail.runtime && (
                <p className="text-lg font-semibold font-mono text-[#8271f3]">
                  <i classname="ri-time-line font-light text-white"></i>{" "}
                  {info.detail.runtime} mins
                </p>
              )}
            </div>
            <div className="tagline ">
              <p className="text-2xl text-zinc-400 italic font-semibold">
                {info.detail.tagline}
              </p>
            </div>
            <div className="overview mt-1 flex flex-col gap-2">
              <h1 className="text-2xl text-zinc-200  font-bold">Overview</h1>
              <p className="text-xl text-zinc-200 font-semibold">
                {info.detail.overview}
              </p>
            </div>

            <div className="overview mb-7 mt-3">
              <p className="text-xl text-zinc-200 font-semibold">
                <span className="text-lg text-zinc-200  font-semibold">
                  Original Language :{" "}
                </span>{" "}
                <span className="text-zinc-400">
                  {info.detail.spoken_languages
                    .map((item) => item.name)
                    .join(", ")}
                </span>
              </p>
            </div>

            <div className="trailer  flex flex-col lg:flex-row gap-5">
              <Link
                to={`${pathname}/trailer`}
                className="bg-[#6556cd]  hover:bg-[#5547b2] w-[40%]  md:w-[20%] lg:w-[45%] xl:w-[10%] mt-1 p-4 rounded text-white font-semibold"
              >
                <i classname="ri-play-fill"></i> Play Trailer
              </Link>
              {currentUser && !isInWatchlist && (
                <button
                  disabled={isWatched.includes(id) || isInWatchlist || isClicked}
                  onClick={handleWatchLater}
                  className={`bg-[#e5de00] hover:bg-[#5547b2] mt-1 p-4 rounded text-black font-semibold w-[80%] md:w-[30%] lg:w-[50%] xl:w-[20%] ${
                    isWatched.includes(id) || isInWatchlist || isClicked
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <div className="watchlist flex gap-3 items-center">
                  {isWatched.includes(id) ?<TiTick /> :<FaPlus />}

                  {isWatched.includes(id) ? "Watched" :  isInWatchlist || isClicked
                      ? "Added to Watchlist"
                      : "Add to Watchlist"}
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* part 3 platforms */}
        {info.watchproviders && (
          <div className="streaming mt-28">
            {info.watchproviders.flatrate && (
              <div className="platform flex gap-5 items-center">
                <span className="text-xl text-zinc-200  font-bold">
                  Available Platforms :{" "}
                </span>
                {info.watchproviders.flatrate.map((item, i) => (
                  <a
                    key={i}
                    href={`https://www.${item.provider_name
                      .replace("Amazon", "")
                      .toLowerCase()
                      .replace(/\s+/g, "")}.com`}
                    target="_blank"
                  >
                    <img
                      key={i}
                      title={item.provider_name}
                      className="rounded-lg w-[7vh] ml-3 h-[7vh]"
                      src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                    />
                  </a>
                ))}
              </div>
            )}

            {info.watchproviders.rent && (
              <div className="rent mt-8">
                <div className="platform flex gap-5 items-center">
                  <span className="text-xl text-zinc-200  font-bold">
                    Available on Rent : &nbsp;&nbsp;
                  </span>

                  {info.watchproviders.rent.map((item, i) => (
                    <a
                      key={i}
                      href={`https://${
                        item.provider_name.toLowerCase().includes("amazon")
                          ? "primevideo"
                          : item.provider_name.toLowerCase().includes("google")
                          ? "play.google"
                          : item.provider_name
                              .replace("Amazon", "")
                              .toLowerCase()
                              .replace(/\s+/g, "")
                      }.com`}
                      target="_blank"
                    >
                      <img
                        key={i}
                        title={item.provider_name}
                        className="rounded-lg w-[7vh] ml-3 h-[7vh]"
                        src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {info.watchproviders.buy && (
              <div className="buy flex gap-5 mt-10 mb-5 items-center">
                <span className="text-xl text-zinc-200  font-bold">
                  Available to Buy :{" "}
                </span>
                &nbsp;
                {info.watchproviders.buy.map((item, i) => (
                  <a
                    key={i}
                    href={`https://${
                      item.provider_name.toLowerCase().includes("google")
                        ? "play.google"
                        : item.provider_name
                            .replace("Amazon", "")
                            .toLowerCase()
                            .replace(/\s+/g, "")
                    }.com`}
                  >
                    <img
                      key={i}
                      title={item.provider_name}
                      className="rounded-lg w-[7vh] ml-3 h-[7vh]"
                      src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        <hr className="bg-zinc-500 w-[80%] mt-24 m-auto h-[1.5px] border-none" />

        {/* part 4 cast */}
        {info.cast.length > 0 && (
          <div className="cast w-[92%] mt-28">
            <h1 className="text-3xl text-white font-bold">Cast : </h1>
            <HorizontalCards title="person" data={info.cast && info.cast} />
            <hr className="bg-zinc-500 w-[80%] mt-24 mb-24 m-auto h-[1.5px] border-none" />
          </div>
        )}

        {/* part 5 Seasons */}
        {info.detail.seasons.length > 0 && (
          <h1 className="text-3xl text-white font-bold">Seasons : </h1>
        )}
        <br />
        {info.detail.seasons && (
          <div className="flex overflow-y-hidden ">
            {info.detail.seasons.slice(0).map((d, i) => {
              return (
                <Link
                  key={i}
                  className="min-w-[75%] h-[60vh] w-[38vh] md:min-w-[48%] lg:min-w-[30%] xl:min-w-[25%] rounded-lg mb-5 border-r-1 hover:shadow-lg duration-100 hover:shadow-[rgba(255,255,255,.3)] bg-zinc-900 mr-5"
                >
                  <img
                    src={
                      d.backdrop_path || d.profile_path || d.poster_path
                        ? `https://image.tmdb.org/t/p/original${
                            d.backdrop_path || d.profile_path || d.poster_path
                          }`
                        : noimage
                    }
                    className="w-[55vh] rounded-md h-[75%] object-cover"
                    alt=""
                  />
                  <h1 className="text-lg px-3 mt-3 font-serif font-black  text-white">
                    {d.name || d.title || d.original_name || d.original_title}
                  </h1>
                  {d.overview && (
                    <p className=" text-sm mt-3 mb-3 px-3 text-zinc-200">
                      {d.overview.slice(0, 80)}...
                      <Link className="text-zinc-400">more</Link>
                    </p>
                  )}
                  {d.character && (
                    <p className=" text-lg mt-3 font-semibold px-2 text-zinc-400">
                      {d.character}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        <hr className="bg-zinc-500 w-[80%] mt-24 m-auto h-[1.5px] border-none" />

        {/* part 6 Recommendations and similar stuff */}
        {info.recommendations.length > 0 || info.similar.length > 0 ? (
          <div className="recommendation mt-28 w-[92%]">
            <h1 className="text-3xl text-white font-bold">
              You might like these :{" "}
            </h1>
            <HorizontalCards
              data={
                info.recommendations.length > 0
                  ? info.recommendations
                  : info.similar
              }
            />
          </div>
        ) : (
          ""
        )}

        {/* part 7 trailer */}
        <Outlet />

        {/* profile */}

        <div className="profile absolute z-50 right-2 top-2 lg:right-5 lg:top-2 text-white pb-3">
          <Link
            to={currentUser ? "/user/profile" : "/signin"}
            className="cursor-pointer"
          >
            {currentUser ? (
              profilePicUrl !== null ? (
                <img
                  src={profilePicUrl}
                  className="md:h-16 md:w-16 h-12 w-12 rounded-full"
                />
              ) : (
                <ProfilePic username={currentUser} />
              )
            ) : (
              <CgProfile className="text-white h-12 w-12" />
            )}
          </Link>
        </div>

        {/* review form */}
        {currentUser && <div ><hr className="bg-zinc-500 w-[80%] mt-24 m-auto h-[1.5px] border-none" />

        <RatingReviewForm movieId={id} /> </div>}
        

        {/* reviews */}

        <hr className="bg-zinc-500 w-[80%] mt-24 m-auto h-[1.5px] border-none" />

        <div className="reviews mt-10 ">
          <h1 className="text-white font-bold text-2xl mb-5">Reviews: </h1>
          <Reviews movieId={id} />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default TVDetails;
