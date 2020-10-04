const movies = require("../movies-data-small.json");

function handleGetMovies(req, res) {
  // validate Query params
  let response = movies;

  if (req.query.genre) {
    response = response.filter((movie) => {
      return movie.genre.toLowerCase().includes(req.query.genre.toLowerCase());
    });
  }

  if (req.query.country) {
    response = response.filter((movie) => {
      return movie.country
        .toLowerCase()
        .includes(req.query.country.toLowerCase());
    });
  }

  const avgVote = Number(req.query.avg_vote);

  if (avgVote) {
    response = response.filter((movie) => {
      return movie.avg_vote >= avgVote;
    });
  }

  return res.status(200).send(response);
}

module.exports = handleGetMovies;
