/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import Loading from "../utils/Loading";
import arrow from "../assets/arrow.svg";
import HorizontalCards from "../templates/HorizontalCards";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import RatingReviewForm from "../pages/RatingReview";
import Reviews from "../pages/Reviews";
import ProfilePic from "../utils/Profilepic";
import { CgProfile } from "react-icons/cg";
import { TiTick } from "react-icons/ti";

function MovieDetails() {
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = localStorage.getItem("user");
  const [isClicked, setIsClicked] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    dispatch(asyncloadmovie(id));

    fetchWatchList();
    fetchWatched();
    //imp
    return () => {
      dispatch(removemovie());
    };
  }, [id, isInWatchlist]);
  // console.log(info);
  document.title = "The Ultimate Cinema" + " | MOVIE | " + id;

  //watchlist
  async function fetchWatchList() {
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.get(
        `http://localhost:3000/movie/add/${id}/user/${userId}`,

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
        `http://localhost:3000/user/`,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setIsWatched(res.data.user.movieWatched)
      // console.log(res.data.user.movieWatched);
      
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
        `http://localhost:3000/movie/add/${id}/user/${userId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

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

  const profilePicUrl = localStorage.getItem("profilePicUrl")


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
        <div className="flex mt-7 xl:h-[55vh] items-center justify-center flex-wrap  lg:flex-nowrap gap-7">
          <img
            src={`https://image.tmdb.org/t/p/original${info.detail.backdrop_path}`}
            className="w-[35vh] h-[50vh] rounded-md shadow-lg shadow-[rgba(255,255,255,0.5)]  object-cover"
            alt=""
          />

          <div className="details flex flex-col gap-2 text-white">
            <div className="title">
              <h1 className="text-3xl lg:text-5xl text-slate-300 font-bold font-serif">
                {info.detail.title}{" "}
                <span className="text-xl lg:text-2xl font-sans">
                  {" "}
                  ({info.detail.release_date.split("-")[0]})
                </span>
              </h1>
            </div>

            <div className="type flex gap-10">
              <p className="text-lg font-semibold lg:text-xl">
                TMDB -{" "}
                {info.detail.vote_average &&
                  info.detail.vote_average.toFixed(1) + "/10"}
              </p>
              <p className="text-lg font-semibold lg:text-xl">
                <i classname="ri-calendar-line"></i>{" "}
                {info.detail.release_date && info.detail.release_date}
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
              <p className="text-xl text-zinc-200 w-[90%] font-semibold">
                {info.detail.overview}
              </p>
            </div>
            {info.director.original_name && (
              <div className="director mt-1">
                <p className="text-2xl text-zinc-300 font-serif font-semibold ">
                  Directed By - {info.director.original_name}
                </p>
              </div>
            )}

            <div className="language mb-7 mt-3 flex">
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
              {currentUser && (
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
                      className="rounded-lg w-[11vh] md:w-[7vh] ml-3 h-[7vh]"
                      src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                    />
                  </a>
                ))}
              </div>
            )}

            {info.watchproviders.rent && (
              <div className="rent mt-8 ">
                <div className="platform flex gap-4 flex-wrap items-center">
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
                        className="rounded-lg  ml-2 h-[7vh]"
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
                      className="rounded-lg w-[11vh] md:w-[7vh] ml-3 h-[7vh]"
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
        <div className="cast mt-28 w-[92%]">
          <h1 className="text-3xl text-white font-bold">Cast : </h1>
          <HorizontalCards title="person" data={info.cast && info.cast} />
        </div>

        <hr className="bg-zinc-500 w-[80%] mt-24 m-auto h-[1.5px] border-none" />

        {/* part 5 Recommendations and similar stuff */}
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

        {/* part 6 trailer */}
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

export default MovieDetails;
