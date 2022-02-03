// Register your controllers routes here
const userController = require('../app/controller/user/userController')
const loginController = require('../app/controller/auth/loginController')
const logoutController = require('../app/controller/auth/logoutController')
const auth = require('../app/middleware/auth')


const registerRoutes = (app) => {

  app.use('/login' ,loginController);
  app.use('/logout', auth, logoutController);


  app.use('/user', auth, userController);
};

module.exports = {
  registerRoutes,
};
