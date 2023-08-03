const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller, jwtAuth, checkJwt) {
    this.controller = controller;
    this.auth = jwtAuth;
    this.checkJwt = checkJwt;
  }

  routes = () => {
    router.get("/", this.controller.test);
    router.get("/helloWorld", this.controller.helloWorld);
    router.post("/body", this.controller.bodyTest);
    router.post("/signup", this.controller.signUp);
    router.post("/login", this.controller.login);

    router.get("/test2", this.checkJwt, this.controller.userTest); // only this route is protected by the checkJwt middleware

    router.use(this.auth); // any route BELOW this line... will pass through this middleware
    router.get("/test", this.controller.userTest);

    return router;
  };
}

module.exports = UserRouter;
