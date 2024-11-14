/* eslint-disable no-unused-vars */
import React from "react";
import notfound from "../assets/notfound.webp";
function NotFound() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <img className="w-[80%] h-[80%]" src={notfound} alt="" />
    </div>
  );
}

export default NotFound;
