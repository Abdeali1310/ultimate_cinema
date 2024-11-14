/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const RatingReviewForm = ({ movieId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const userId = localStorage.getItem("userId");
  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `https://ultimate-cinema-server.vercel.app/review/add/${userId}/${movieId}`,
        {
          comment: review,
          rating: rating,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res) {
        toast.success("Review Created!");
        setRating(0);
        setReview("");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error while creating review", error);
    }
  };

  return (
    <div className="max-w-md lg:max-w-3xl mx-auto mt-16 p-6 text-slate-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold  mb-4">Leave a Review</h2>
      <div className="flex lg:w-[80vh] mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`text-2xl ${
              star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={5}
      ></textarea>
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit Review
      </button>
    </div>
  );
};

export default RatingReviewForm;
