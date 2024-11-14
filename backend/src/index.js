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

app.use(cors({
    origin: "https://ultimate-cinema-client.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://ultimate-cinema-client.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


app.get("/", (req, res) => {
    res.send("Hello World")
})
app.use("/user", userRouter)
app.use("/movie", movieRouter)
app.use("/tv", tvRouter)
app.use('/auth', authRouter);
app.use("/review", reviewRouter)

app.listen(process.env.PORT, () => {
    console.log("App is running on PORT " + process.env.PORT);
    DB_connect()
})