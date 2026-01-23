const express = require('express');
const dbHandler = require('./server/config/dbHandler');
const path = require('path');
const cors = require('cors');

const app = express();

// Connect Database
dbHandler.connect();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
const apiRouter = require('./server/routes/api/index');
const historyRouter = require('./server/routes/api/history');
const configRouter = require('./server/routes/api/config');
const usersRouter = require('./server/routes/api/users');
const authRouter = require('./server/routes/api/auth');
const profileRouter = require('./server/routes/api/profile');
const postsRouter = require('./server/routes/api/posts');
const tokensRouter = require('./server/routes/api/tokens');
const tokenPairsRouter = require('./server/routes/api/tokenPairs');

app.use('/api', apiRouter);
app.use('/api/history', historyRouter);
app.use('/api/config', configRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postsRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/token-pairs', tokenPairsRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use, trying port ${port + 1}`);
      startServer(port + 1); // Try next available port
    } else {
      console.error(err);
    }
  });
}

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

startServer(PORT);
