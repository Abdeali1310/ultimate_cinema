/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../utils/Loading";

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://ultimate-cinema-server.vercel.app/review/${movieId}`
        );
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching reviews", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i <= rating ? "gold" : "gray"} // Gold for filled stars, gray for empty stars
          className="w-6 h-6"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  return (
    <div className="movie-details">

      
      <div className="reviews mb-16 flex flex-row gap-3 md:gap-5 flex-wrap text-white">
        {reviews.length === 0 ? (
          <p>No reviews yet!.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review bg-zinc-900 p-4 mb-4 md:w-[45%] lg:w-[30%] w-full rounded-md">
              {review.userId && <h4>
                <strong>@{review.userId.username}</strong> 
                <div className="ratings flex mt-2">

                {renderStars(review.rating)}
                </div>
              </h4>}
              <p className="mt-2">{review.comment}</p>
              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
