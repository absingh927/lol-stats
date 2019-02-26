require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();

// middleware
app.use(helmet());

app.use('/api', require('./server/routes'));

if (process.env.NODE_ENV === 'production') {
  // Serve any static assets first
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'client/build', 'index.html')));
}

// Listen for connections
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', _ => console.log(`Lol-stats server listening on port ${port}`));