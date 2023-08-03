// require Express NPM library
const express = require("express");
const cors = require("cors");




// initialize dotenv
require("dotenv").config();



// import database
const db = require("./models");
//console.log('db:', db)
const { users } = db;

console.log('users', users)

// import middlewares
const jwtAuth = require('./middlewares/jwtAuth')
const checkJwt = require('./middlewares/checkJwt')




//import controllers
const BaseController = require("./controllers/baseController.js");
const UserController = require("./controllers/userController");

// initialize controllers
const userController = new UserController({users, db});

// import routers
const UserRouter = require("./routers/userRouter.js");

// initialize routers
const userRouter = new UserRouter(userController, jwtAuth, checkJwt);



// Declare the port to listen to and initialise Express
const app = express();

// middlewares


const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=> res.json({msg: 'Welcome to the FTBC12 sample express backend, THIS THING ACTUALLY WORKS?!'}))
app.use("/users", userRouter.routes());



const PORT = process.env.PORT || 8000;
// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
