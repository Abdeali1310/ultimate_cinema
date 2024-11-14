/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Loading from "../utils/Loading";
import { Link } from "react-router-dom";
import noimage from "../assets/noimage.jpg";

function WatchedCard({ type, movie }) {
  const [Movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/${type}/${movie}`)
      .then((res) => {
        setMovie(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setError(error);
        setIsLoading(false);
      });
  }, [movie]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading movie details.</div>;

  return Movie ? (
    <div className="flex-shrink-0 h-[35vh] w-[25vh] min-w-[100px] rounded-lg mb-10 border-r-1 bg-zinc-900 mr-8">
      <Link
        to={`/${type}/details/${movie}`}
        className="block hover:shadow-lg duration-100 hover:shadow-[rgba(255,255,255,.3)] h-full"
      >
        <img
          src={
            Movie.backdrop_path || Movie.profile_path
              ? `https://image.tmdb.org/t/p/original${
                  Movie.backdrop_path || Movie.profile_path
                }`
              : noimage
          }
          className="rounded-md h-[70%] w-full object-cover"
          alt=""
        />
        <h1 className="text-sm px-4 mt-3 font-serif font-black text-white">
          {Movie.name ||
            Movie.title ||
            Movie.original_name ||
            Movie.original_title}
        </h1>
        
      </Link>
    </div>
  ) : (
    <div>No details available</div>
  );
}

export default WatchedCard;
