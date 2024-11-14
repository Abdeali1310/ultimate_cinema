/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TVDetails from "./components/TVDetails";
import PersonDetails from "./components/PersonDetails";
import Trailer from "./components/Trailer";
import NotFound from "./utils/NotFound";
import Contact from "./templates/Contact";
import AboutUs from "./templates/AboutUs";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import UserProfile from "./pages/UserProfile";
import Privacy from "./templates/Privacy";
import Terms from "./templates/Terms";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfileEdit from "./pages/ProfileEdit";
function App() {
  return (
    <div className="bg-[#1f1e24] flex w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tvshows" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TVDetails />} >
        <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/people" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/user/profile/edit/:userId" element={<ProfileEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
