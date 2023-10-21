const movieRepository = require("../repository/movieRepository.js");


const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}` + path.extname(file.originalname));
  },
});

const multerFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|jfif)$/)) {
    return cb(new Error("Please upload an Image (png/jpg)"));
  }
  cb(null, true);
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});


exports.create = async (req, res) => {
  try {
    const { name, genres, year } = req.body;
    const icon = req.file.filename;

    await movieRepository.createMovie(name, genres, year, icon);

    res.status(201).json({
      statusCode: 201,
      status: true,
      message: "Movie created successfully",
      data: [],
    });
  } catch (error) {
    console.error("Error creating a movie:", error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Internal Server Error",
      data: [],
    });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await movieRepository.getMovies();

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "Movies retrieved successfully",
      data: movies,
    });
  } catch (error) {
    console.error("Error retrieving movies:", error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Internal Server Error",
      data: [],
    });
  }
};

exports.updateMovie = async (req, res) => {
  const { id, name, genres, year } = req.body;

  try {
    await movieRepository.updateMovie(id, name, genres, year);

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "Movie updated successfully",
      data: [],
    });
  } catch (error) {
    console.error("Error updating the movie:", error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Internal Server Error",
      data: [],
    });
  }
};

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    await movieRepository.deleteMovie(id);

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "Movie deleted successfully",
      data: [],
    });
  } catch (error) {
    console.error("Error deleting the movie:", error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Internal Server Error",
      data: [],
    });
  }
};
