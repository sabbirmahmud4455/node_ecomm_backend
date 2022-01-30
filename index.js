// DECLARATION
const express = require('express');
const app = express();

const { registerRoutes } = require('./router/routes');
const port = 3000;

// CONFIGURATION
app.use(express.json());


// MIDDLEWARES


// ROUTES
registerRoutes(app);



// SERVER
app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});