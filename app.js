const express = require('express');
const router = express.Router();
const data =  require('./data.json');

const app = express();
const path = require('path');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Explain how to code above works


// Set up middleware
app.use('/static', express.static(path.join(__dirname, 'public')));


/* GET home and about page. */
router.get('/', function(req, res, next) {
    // 1. Pass all project data to 'index' template
    res.render('index',{projects: data.projects});
  });

  router.get('/about', function(req, res, next) {
    // 1. Pass all project data to 'index' template
    res.render('about', {projects: data.projects});
  });


  router.get('/projects/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = data.projects.find( ({ id }) => id === +projectId );
    
    if (project) {
      res.render('project', { project });
    } else {
      const error = new Error('Project not found');
      error.status = 404;
      next(error);
    }
  });

  

// Set up middleware to catch undefined routes
app.use((req, res, next) => {
  const error = new Error('Sorry, the page you requested could not be found.');
  error.status = 404;
  next(error);
});

// Set up error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  if (error.status === 404) {
    res.send('Sorry, the page you requested could not be found.');
  } else {
    res.json({ error: error.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


 module.exports = router;
