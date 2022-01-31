// Register your controllers routes here
const userController = require('../app/controller/user/userController')
const loginController = require('../app/controller/auth/loginController')
const {auth} = require('../app/middleware/auth')

const registerRoutes = (app) => {

  app.use('/login' ,loginController);


  app.use('/user', auth, userController);
};

module.exports = {
  registerRoutes,
};
