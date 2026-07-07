// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

async function startServer() {
  try {
    await mongoose.connect('mongodb://localhost:27017/cms');
    console.log('Connected to database!');
  } catch (err) {
    console.log('Connection failed: ' + err);
    process.exit(1);
  }

  const index = require('./server/routes/app');
  const messageRoutes = require('./server/routes/messages');
  const contactRoutes = require('./server/routes/contacts');
  const documentRoutes = require('./server/routes/documents');

  app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(logger('dev'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  });

  app.use(express.static(path.join(__dirname, 'dist/cms')));

  app
    .use('/', index)
    .use('/messages', messageRoutes)
    .use('/contacts', contactRoutes)
    .use('/documents', documentRoutes);

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('API running on localhost: ' + port);
  });
}

startServer();
