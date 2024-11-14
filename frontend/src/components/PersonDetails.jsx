/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadperson, removeperson } from "../store/actions/peopleActions";
import Loading from "../utils/Loading";
import arrow from "../assets/arrow.svg";
import HorizontalCards from "../templates/HorizontalCards";

function PersonDetails() {
  const { id } = useParams();
  const { info } = useSelector((state) => state.people);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  document.title = "The Ultimate Cinema" + " | PERSON | " + id;

  return info ? (
    <>
      <div className="h-auto w-screen overflow-auto relative px-6 sm:px-12 lg:px-[10%]">
        <nav className="w-full text-zinc-200 h-[10vh] items-center flex gap-8 text-2xl">
          <Link
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] ri-arrow-left-line"
          />
        </nav>

        {/* Poster and Personal Details Section */}
        <div className="flex flex-col lg:flex-row mt-7 gap-6 lg:gap-12">
          {/* Left Section: Image and Socials */}
          <div className="details w-full lg:w-[30%] flex flex-col gap-7">
            <img
              src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
              className="w-full h-[50vh] md:w-[80vh] md:h-[80vh] lg:h-[50vh] xl:h-[60vh] rounded-md shadow-lg shadow-[rgba(255,255,255,0.5)] object-cover"
              alt=""
            />

            {/* Socials */}
            <div className="socials flex gap-8 justify-evenly text-white text-3xl mt-6">
              {info.externalid.wikidata_id && (
                <a
                  className="hover:text-[#6556cd]"
                  target="_blank"
                  href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                >
                  <i className="ri-global-fill"></i>
                </a>
              )}
              {info.externalid.instagram_id && (
                <a
                  className="hover:text-[#6556cd]"
                  target="_blank"
                  href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                >
                  <i className="ri-instagram-line"></i>
                </a>
              )}
              {info.externalid.facebook_id && (
                <a
                  className="hover:text-[#6556cd]"
                  target="_blank"
                  href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                >
                  <i className="ri-facebook-line"></i>
                </a>
              )}
              {info.externalid.twitter_id && (
                <a
                  className="hover:text-[#6556cd]"
                  target="_blank"
                  href={`https://x.com/${info.externalid.twitter_id}`}
                >
                  <i className="ri-twitter-x-line"></i>
                </a>
              )}
            </div>

            {/* Personal Info Section */}
            <div className="all-details w-full mt-8">
              <h1 className="text-zinc-400 text-3xl font-semibold">Personal Info</h1>
              <div className="knownfor mt-6">
                <h1 className="text-zinc-400 text-2xl font-semibold">Known For</h1>
                <p className="text-zinc-200 text-xl font-bold mt-2">
                  {info.detail.known_for_department}
                </p>
              </div>

              <div className="mt-6">
                <h1 className="text-zinc-400 text-2xl font-semibold">Gender</h1>
                <p className="text-zinc-200 text-xl font-bold mt-2">
                  {info.detail.gender === 2 ? "Male" : "Female"}
                </p>
              </div>

              <div className="mt-6">
                <h1 className="text-zinc-400 text-2xl font-semibold">Birthday</h1>
                <p className="text-zinc-200 text-xl font-bold mt-2">
                  {info.detail.birthday}
                </p>
              </div>

              <div className="mt-6">
                <h1 className="text-zinc-400 text-2xl font-semibold">Place of Birth</h1>
                <p className="text-zinc-200 text-xl font-bold mt-2">
                  {info.detail.place_of_birth}
                </p>
              </div>

              <div className="mt-6">
                <h1 className="text-zinc-400 text-2xl font-semibold">Also Known As</h1>
                <p className="text-zinc-200 text-xl font-bold mt-2 mb-12">
                  {info.detail.also_known_as.map((item, i) => (
                    <div key={i}>{item}</div>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Name, Biography, Credits */}
          <div className="details w-full lg:w-[65%] flex flex-col gap-4 text-white">
            {/* Name */}
            <div className="name mb-4">
              <h1 className="text-3xl lg:text-5xl font-bold font-serif">
                {info.detail.name}
              </h1>
            </div>

            {/* Biography */}
            <div className="biography mt-4 flex flex-col gap-2">
              <h1 className="text-2xl text-zinc-200 font-bold mb-2">Biography</h1>
              <p className="text-xl text-zinc-200 w-full lg:w-[90%] font-semibold">
                {info.detail.biography}
              </p>
            </div>

            {/* Credits */}
            <div className="credits mt-12 flex flex-col gap-2">
              <h1 className="text-2xl text-zinc-200 font-bold mb-2">Works:</h1>
              <HorizontalCards data={info.credits.cast} detail="no" />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default PersonDetails;
