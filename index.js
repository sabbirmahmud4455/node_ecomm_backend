// DECLARATION
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { registerRoutes } = require('./router/routes');
const cookieParser = require('cookie-parser')

const port = 3000;

// CONFIGURATION
app.use(express.json());
app.use(cookieParser())

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8080'}));

// ROUTES
registerRoutes(app);

// SERVER
app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});