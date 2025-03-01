const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", require("./routes/testRoutes"));

app.get("/", (req, res) => {
    res.status(200).send("<h1>Welcome to Food Sever</h1>");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`.bgGreen.red.bold);
});