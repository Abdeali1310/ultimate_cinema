import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWJkYWU2NDBiMWRjZGEwOWIyZjY2ZTRhYTc4NjAwYyIsIm5iZiI6MTcyNTg5MzgzNi4yNzQ3MzgsInN1YiI6IjY1M2QwYjI1Y2M5NjgzMDBlYTcwYzkzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0F5VxKV6_pgcb4WtHg9ic4POk5pnztHZOst78hmf7t4",
  },
});


export default instance