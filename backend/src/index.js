const express = require("express");
const { DB_connect } = require("./db");
const userRouter = require("./routers/userRouter");
const app = express();
const cors = require("cors");
const movieRouter = require("./routers/movieRouter");
const tvRouter = require("./routers/tvRouter");
const authRouter = require("./routers/authRouter");
const reviewRouter = require("./routers/reviewRouter")

require('dotenv').config();

app.use(cors({origin:process.env.FRONTEND_URL}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user",userRouter)
app.use("/movie",movieRouter)
app.use("/tv",tvRouter)
app.use('/auth', authRouter);
app.use("/review",reviewRouter)

app.listen(process.env.PORT,()=>{
    console.log("App is running on PORT "+process.env.PORT);
    DB_connect()
})