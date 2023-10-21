const client = require('../db/db.js');
const controller =  require('../controllers/movieController.js');



module.exports = function(app) {

//    app.use(multerMiddleware);
   app.post('/movies/upload', controller.upload.single('icon'),controller.create);
   app.get('/movies', controller.getMovies);
   app.put('/movies/:id', controller.updateMovie);
   app.delete('/movies/:id', controller.deleteMovie);
    
};