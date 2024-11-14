/* eslint-disable no-unused-vars */
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      {/* Responsive spinner loader */}
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
