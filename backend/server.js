  const express = require("express");
  const cors = require("cors");
  const bodyParser = require("body-parser");
  //  const session = require("express-session");
  const path = require("path");
  // .env

  require("dotenv").config();
  const app = express();
  const port = process.env.PORT || 3001;
  const corsOptions = {
    origin: true,
    credentials: true,
  };
  const timezone = "Asia/Manila";
  process.env.TZ = timezone;

  app.use(bodyParser.json());
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  // app.use(session({ secret: process.env.PUBLICVAPIDKEY, resave: false, saveUninitialized: false }))

  const Auth = require("./routes/auth.routes");
  const addUsers = require("./routes/addUsers.routes");

  // File Upload API
  const fileUpload = require("express-fileupload");
  app.use(fileUpload());
  app.use(express.static("public"));
  // Email Sender

  app.use("/auth", Auth);
  app.use('/addusers', addUsers);

  app.get("/", function (req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to BIBI CHECKER");
  });

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
