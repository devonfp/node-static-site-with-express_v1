const express = require('express');
const data =  require('./data.json');

const app = express();
const path = require('path');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Sets up middleware
app.use('/static', express.static(path.join(__dirname, 'public')));


/* GET home and about page. */
app.get('/', function(req, res, next) {
    res.render('index',{projects: data.projects});
  });

  app.get('/about', function(req, res, next) {
    res.render('about', {projects: data.projects});
  });


  app.get('/projects/:id', function(req, res, next) {
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

  

// Sets up middleware to catch undefined routes
app.use((req, res, next) => {
  const error = new Error('Sorry, the page you requested could not be found.');
  error.status = 404;
  next(error);
});

// Sets up error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  if (error.status === 404) {
    res.send('Sorry! It appears the page you requested could not be found.');
  } else {
    res.json({ error: error.message });
  }
});

// Starts server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


 module.exports = app;
