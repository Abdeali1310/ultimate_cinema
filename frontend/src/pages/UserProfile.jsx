/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import Loading from "../utils/Loading";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import ProfilePic from "../utils/Profilepic";
import { toast, ToastContainer } from "react-toastify";
import WatchlistCard from "./WatchlistCard";
import { MdModeEdit } from "react-icons/md";
import WatchedCard from "./WatchedCard";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [movieWatchlist, setMovieWatchlist] = useState([]);
  const [tvWatchlist, setTvWatchlist] = useState([]);
  const [tvWatched, setTvWatched] = useState([]);
  const [movieWatched, setMovieWatched] = useState([]);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      fetchUserData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  async function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("profilePicUrl");
    localStorage.removeItem("userId");

    // localStorage.removeItem("userId")
    toast.success("Logged Out Successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://ultimate-cinema-server.vercel.app/user/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser(response.data.user);
      setMovieWatchlist(response.data.user.movieWatchlist);
      setTvWatchlist(response.data.user.tvWatchlist);
      setTvWatched(response.data.user.tvWatched);
      setMovieWatched(response.data.user.movieWatched);

      console.log(movieWatchlist);
    } catch (error) {
      navigate("/signin");
      console.error("Error fetching user data:", error);
    }
  };

  //handle remove
  const handleMovieRemove = async (id) => {
    console.log("Removing movie with ID:", id);
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.delete(
        `https://ultimate-cinema-server.vercel.app/movie/remove/${id}/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Delete successful:", response.data);

      const filteredMovieWatchlist = movieWatchlist.filter(
        (movie) => String(movie) !== String(id)
      );

      console.log("Original movieWatchlist:", movieWatchlist);
      console.log("Filtered movieWatchlist:", filteredMovieWatchlist);

      setMovieWatchlist(filteredMovieWatchlist);
      toast.success("Successfully Removed")
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleTvRemove = async (id) => {
    console.log(id);

    try {
      const response = await axios.delete(
        `https://ultimate-cinema-server.vercel.app/tv/remove/${id}/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Delete successful:", response.data);

      const filteredTvWatchlist = tvWatchlist.filter((tv) => id !== tv);
      console.log(filteredTvWatchlist);
      // console.log("Original tvWatchlist:", tvWatchlist);
      // console.log("Filtered tvWatchlist:", filteredTvWatchlist);

      setTvWatchlist(filteredTvWatchlist);
      toast.success("Successfully Removed")

    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  //handle Watched
  const handleMovieWatched = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://ultimate-cinema-server.vercel.app/movie/remove/${id}/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Delete successful:", response.data);

      const filteredMovieWatchlist = movieWatchlist.filter(
        (movie) => String(movie) !== String(id)
      );

      const postResponse = await axios.post(
        `https://ultimate-cinema-server.vercel.app/movie/add/watched/${id}/user/${userId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Post response:", postResponse);

      setMovieWatched((prev) => [...prev, id]);
      setMovieWatchlist(filteredMovieWatchlist);
      toast.success("Successfully Added")

      // console.log("Original movieWatchlist:", movieWatchlist);
      // console.log("Filtered movieWatchlist:", filteredMovieWatchlist);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleTvWatched = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://ultimate-cinema-server.vercel.app/tv/remove/${id}/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Delete successful:", response.data);

      const filteredTvWatchlist = tvWatchlist.filter(
        (tv) => String(tv) !== String(id)
      );

      const postResponse = await axios.post(
        `https://ultimate-cinema-server.vercel.app/tv/add/watched/${id}/user/${userId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Post response:", postResponse);

      setTvWatched((prev) => [...prev, id]);
      setTvWatchlist(filteredTvWatchlist);
      toast.success("Successfully Added")

      // console.log("Original tvWatchlist:", tvWatchlist);
      // console.log("Filtered tvWatchlist:", filteredTvWatchlist);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };





  if (!isLoggedIn) {
    return (
      <div className="flex hscreen w-screen flex-col items-center justify-center min-h-screen bg-zinc-700">
        <div className="bg-slate-100 p-6 flex flex-col items-center rounded-lg shadow-lg text-center">
          <CgProfile className="text-center h-20 w-16 lg:h-28 lg:w-24" />
          <h2 className="text-2xl font-bold mb-4">
            Welcome to The Ultimate Cinema!
          </h2>
          <p className="mb-4">
            Please sign in or sign up to access your profile.
          </p>
          <div className="flex gap-4">
            <Link
              to={"/signin"}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <FaSignInAlt className="mr-2" /> Sign In
            </Link>
            <Link
              to={"/signup"}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
            >
              <FaUserPlus className="mr-2" /> Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-auto h-screen w-screen m-auto md:w-[70%]">
      <ToastContainer />
      {user ? (
        <div className=" mx-auto relative overflow-auto bg-zinc-600 shadow-md rounded-lg ">
          <div className="bg-slate-600 p-6 text-center flex flex-col gap-5 justify-center items-center text-white">
            {user.profilePicUrl ? (
              <img
                src={user.profilePicUrl}
                className="md:h-24 md:w-24 h-20 w-20 rounded-full"
              />
            ) : (
              <ProfilePic profile="true" username={user.username} />
            )}
            <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
            {user.bio && (
              <p className="text-lg lg:text-xl text-zinc-300">{user.bio}</p>
            )}
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-700 border border-zinc-700 rounded-lg p-4 shadow-sm">
              <h2 className="text-xl md:text-lg lg:text-xl text-white font-semibold mb-4">
                TV Shows Watchlist
              </h2>
              <div className=" flex  gap-2 overflow-x-scroll  overflow-y-hidden">
                {tvWatchlist.length > 0 ? (
                  tvWatchlist.map((tv) => (
                    <WatchlistCard
                      key={tv.id}
                      type="tv"
                      movie={tv}
                      handleTvRemove={handleTvRemove}
                      handleTvWatched={handleTvWatched}
                    />
                  ))
                ) : (
                  <p className="text-white">No Tv Shows yet!</p>
                )}
              </div>
            </div>

            {/* Movie Watchlist Card */}
            <div className="  bg-zinc-700 text-white border-zinc-700  rounded-lg p-4 shadow-sm">
              <h2 className="text-xl text-white font-semibold mb-4">
                Movie Watchlist
              </h2>
              <div className=" flex  gap-5 overflow-x-scroll  overflow-y-hidden">
                {movieWatchlist.length > 0
                  ? movieWatchlist.map((movie) => (
                      <WatchlistCard
                        key={movie.id}
                        type="movie"
                        movie={movie}
                        handleMovieRemove={handleMovieRemove}
                        handleMovieWatched={handleMovieWatched}
                      />
                    ))
                  : "No Movies yet"}
              </div>
            </div>

            {/* TV Watched Card */}
            <div className="bg-zinc-700 text-white border-zinc-700 rounded-lg p-4 shadow-sm">
              <h2 className="text-xl md:text-lg lg:text-xl text-white font-semibold mb-4">
                TV Shows Watched
              </h2>
              {/* <ul className="space-y-2">
                {tvWatched.length > 0
                  ? tvWatched.map((show, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-gray-700">{show}</span>
                      </li>
                    ))
                  : "No Tv Shows yet!"}
              </ul> */}

              <div className=" flex gap-5 overflow-x-scroll overflow-y-hidden">
                {tvWatched.length > 0
                  ? tvWatched.map((tv) => (
                      <WatchedCard key={tv.id} type="tv" movie={tv} />
                    ))
                  : "No Tv shows yet"}
              </div>
            </div>

            {/* Movie Watched Card */}
            <div className="bg-zinc-700 text-white border-zinc-700  rounded-lg p-4 shadow-sm">
              <h2 className="text-xl  font-semibold mb-4">Movies Watched</h2>
              {/* <div className="space-y-2">
                {movieWatched.length > 0
                  ? movieWatched.map((movie, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-white">{movie}</span>
                      </li>
                    ))
                  : "No Movies Yet!"}
              </div> */}

              <div className=" flex gap-5 overflow-x-scroll overflow-y-hidden">
                {movieWatched.length > 0
                  ? movieWatched.map((movie) => (
                      <WatchedCard key={movie.id} type="movie" movie={movie} />
                    ))
                  : "No Movies yet"}
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 mb-8 mr-10 h-[50%] w-[50%] justify-center item-c text-center text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
            >
              <FaSignInAlt className="mr-2" /> Logout
            </button>
          </div>
          <div className="edit absolute right-12 top-5">
            <Link to={`/user/profile/edit/${userId}`}>
              <MdModeEdit className="h-[5vh] w-[4vh]" />
            </Link>
          </div>{" "}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default UserProfile;
