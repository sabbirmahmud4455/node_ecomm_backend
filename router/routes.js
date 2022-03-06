// Register your controllers routes here
const userController = require('../app/controller/user/userController')
const loginController = require('../app/controller/auth/loginController')
const registerController = require('../app/controller/auth/registerController')
const logoutController = require('../app/controller/auth/logoutController')
const auth = require('../app/middleware/auth')


const registerRoutes = (app) => {

  // auth router
  app.use('/login', loginController);
  
  app.use('/register', registerController);

  app.use('/logout', auth, logoutController);

  // user router
  app.use('/user', auth, userController);
};

module.exports = {
  registerRoutes,
};
