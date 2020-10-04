const assert = require("chai").assert;
const supertest = require("supertest");
const app = require("../app");
const API_TOKEN = require("../config").API_TOKEN;

describe("GET /movies", () => {
  describe("When searching by genre", () => {
    it("returns movie's who's genre matches the specified string", () => {
      return supertest(app)
        .get("/movies")
        .set("Authorization", `Bearer ${API_TOKEN}`)
        .query({ genre: "Com" })
        .expect(200)
        .then((response) => {
          assert.isAtLeast(response.body.length, 1);
          for (movie of response.body) {
            assert(movie.genre, "Comedy");
          }
        });
    });
    it("returns movie's who's genre includes the specified string", () => {
      return supertest(app)
        .get("/movies")
        .set("Authorization", `Bearer ${API_TOKEN}`)
        .query({ genre: "Com" })
        .expect(200)
        .then((response) => {
          assert.isAtLeast(response.body.length, 1);
          for (movie of response.body) {
            assert(movie.genre, "Comedy");
          }
        });
    });
    it("should be case insensitive", () => {
      return supertest(app)
        .get("/movies")
        .set("Authorization", `Bearer ${API_TOKEN}`)
        .query({ genre: "comedy" })
        .expect(200)
        .then((response) => {
          assert.isAtLeast(response.body.length, 1);
          for (movie of response.body) {
            assert(movie.genre, "Comedy");
          }
        });
    });
  });
  describe("When searching by country", () => {
    it("returns movie's who's country includes the specified string", () => {
      return supertest(app)
        .get("/movies")
        .set("Authorization", `Bearer ${API_TOKEN}`)
        .query({ country: "Italy" })
        .expect(200)
        .then((response) => {
          assert.isAtLeast(response.body.length, 1);
          for (movie of response.body) {
            assert(movie.country, "Italy");
          }
        });
    });
    it("the search should be case insensitive.", () => {
      return supertest(app)
        .get("/movies")
        .set("Authorization", `Bearer ${API_TOKEN}`)
        .query({ country: "IT" })
        .expect(200)
        .then((response) => {
          assert.isAtLeast(response.body.length, 1);
          for (movie of response.body) {
            assert(movie.country, "Italy");
          }
        });
    });
    describe("when searching by avg_vote", () => {
      it("returns movies with an avg_vote that is greater than or equal to the supplied number.", () => {
        return supertest(app)
          .get("/movies")
          .set("Authorization", `Bearer ${API_TOKEN}`)
          .query({ avg_vote: 7 })
          .expect(200)
          .then((response) => {
            assert.isAtLeast(response.body.length, 1);
            for (movie of response.body) {
              assert(movie.avg_vote >= 7);
            }
          });
      });
    });
  });

  describe("valid authorization header with a Bearer API token value required", () => {
    it("retruns 401 if not provided", () => {
      return supertest(app).get("/movies").expect(401);
    });
    it("retruns 401 if invalid token provided", () => {
      return supertest(app)
        .get("/movies")
        .set("Authorization", "Bearer Invalid_Token")
        .expect(401);
    });
  });

  describe("support for CORS and best practice headers in place", () => {
    it("returns Access-Control-Allow-Origin header", () => {
      return supertest(app)
        .get("/movies")
        .expect("Access-Control-Allow-Origin", "*");
    });
    it("X-Powered-By header is absent", () => {
      return supertest(app)
        .get("/movies")
        .then((res) => {
          assert.doesNotHaveAnyKeys(res.headers, "x-powered-by");
        });
    });
  });
});
