// Register your controllers routes here
const userController = require('../app/controller/user/userController')

const registerRoutes = (app) => {
  app.use('/user', userController);
};

module.exports = {
  registerRoutes,
};
