// DECLARATION
const express = require('express');
const app = express();
var cors = require('cors');

const { registerRoutes } = require('./router/routes');
const port = 3000;

// CONFIGURATION
app.use(express.json());


// use it before all route definitions
app.use(cors({origin: 'http://localhost:8080'}));


// MIDDLEWARES


// ROUTES
registerRoutes(app);

// SERVER
app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});