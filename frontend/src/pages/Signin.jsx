import axios from 'axios';
import  { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Signin() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    try {
        const res = await axios.post(
          "https://ultimate-cinema-server.vercel.app/user/signin",
          formData
        );
        console.log(res);
        
        if(res.data.token){
  
          toast.success('Successfully logged In!');
          localStorage.setItem("token",res.data.token)

          setTimeout(() => {
              navigate("/")
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        toast.error("Invalid Credentials");
      }    
  };

  return (
    <div className="flex w-full bg-zinc-700 items-center justify-center min-h-screen">
        <ToastContainer />

      <div className="bg-slate-100 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Link to={"/forgot-password"} className='text-indigo-500 text-sm hover:underline' >Forgot password? </Link>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Do not have an account?{' '}
          <a href="/signup" className="text-indigo-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
