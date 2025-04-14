const express = require('express');
const cors = require('cors');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { tiendasRouter } = require('./routes/tiendas.routes');
const { casosRouter } = require('./routes/casos.routes');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Configure CORS
app.use(cors());

// Configure CORS options
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://soporte-campo-frontend.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tiendas', tiendasRouter);
app.use('/api/v1/casos', casosRouter);
// app.use('/api/v1/ubicaciones', ubicacionTecnicosRouter);

// Global error handler
app.use(globalErrorHandler);

// Catch non-existing endpoints
app.use((req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };
