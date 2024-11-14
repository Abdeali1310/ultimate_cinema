/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProfilePic from "../utils/Profilepic";
import { CgProfile } from "react-icons/cg";

function ProfileEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("user");

  const [formData, setFormData] = useState({
    username: localStorage.getItem("user"),
    email: localStorage.getItem("userEmail"),
    bio: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const defaultProfilePic = localStorage.getItem("profilePicUrl");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(URL.createObjectURL(file)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Profile data submitted:", formData);

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files.length > 0) {
      formDataToSend.append("profilePic", fileInput.files[0]);
    } else if (defaultProfilePic) {
      formDataToSend.append("profilePic", defaultProfilePic);
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/user/profile/edit/${userId}`,
        formDataToSend
      );
      console.log(res);

      if (res.data.msg) {
        toast.success("Successfully Edited!");
        setTimeout(() => {
          navigate("/");
          navigate("/");
        }, 1000);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Username / email already taken");
    }
  };

  return (
    <div className="flex w-full bg-zinc-700 items-center justify-center min-h-screen">
      <div className="bg-slate-100 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Your Profile
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div className="flex items-center flex-col">
            <div className="flex flex-col justify-center items-center">

              {defaultProfilePic !== null && (
                <div className="mt-2">
                  <img
                    src={selectedFile || defaultProfilePic} 
                    alt="Profile Preview"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>
              )}
            </div>

            <input type="file" required onChange={handleFileChange} />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="bio"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows="5"
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#fffd01] text-black py-2 rounded hover:bg-indigo-600 transition duration-200"
            onClick={handleSubmit}
          >
            {/* Conditionally render loader or text */}
            {isLoading ? (
              <div className="loader w-5 h-5 border-4 border-t-transparent border-black rounded-full animate-spin mx-auto" />
            ) : (
              "Edit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit;
