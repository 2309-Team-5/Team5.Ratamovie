const express = require('express');
const postsRouter = express.Router();

// const { requireReview } = require('./api');
// need info on this in the review
const { 
    createMovie,
    getAllMovies,
    // updateMovie,
    // getMovieById,
    // deleteMovie,
// do we need to add the rest of juice file?
// /API/MOIVES/:ID
// let movie = await getAllMovies(id);
// let reviews = await
// getReviews
} = require('../db');

postsRouter.get('/', async (req, res, next) => {
    try {
      const allMovies = await getAllMovies();
  
      
      res.send(allMovies);
    } catch (error) {
      next(error);
    }
  });






  moviesRouter.post('/', requireReview, async (req, res, next) => {
    const { id, title, description, year = "" } = req.body;
  
    const movieData = {};
  
    try {
        movieData.directorId = req.user.id;
        movieData.title = title;
        movieData.description = description;
        movieData.year = year;
  
      const movie = await createMovie(movieData);
  
      if (movie) {
        res.send(movie);
      } else {
        next({
          name: 'PostCreationError',
          message: 'There was an error creating your movie. Please try again.'
        })
      }
    } catch (error) {
        next(error);
      }
    });
  



  module.exports = moviesRouter;