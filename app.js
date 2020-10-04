require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const handleGetMovies = require("./routeHandlers/handleGetMovies");
const validateBearerToken = require("./middleware/validateBearerToken");

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use((req, res, next) => validateBearerToken(req, res, next));

app.get("/movies", (req, res) => {
  handleGetMovies(req, res);
});

module.exports = app;
