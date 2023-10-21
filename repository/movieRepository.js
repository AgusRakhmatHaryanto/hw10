const client = require("../db/db.js");

exports.createMovie = async (name, genres, year, icon) => {
  const query = {
    text: "INSERT INTO movies (name, genres, year, icon) VALUES ($1, $2, $3, $4)",
    values: [name, genres, year, icon],
  };
  await client.query(query);
};

exports.getMovies = async () => {
  const query = "SELECT * FROM movies";
  const result = await client.query(query);
  return result.rows;
};

exports.updateMovie = async (id, name, genres, year) => {
  const query = {
    text: "UPDATE movies SET name = $1, genres = $2, year = $3 WHERE id = $4",
    values: [name, genres, year, id],
  };
  await client.query(query);
};

exports.deleteMovie = async (id) => {
  const query = {
    text: "DELETE FROM movies WHERE id = $1",
    values: [id],
  };
  await client.query(query);
};
