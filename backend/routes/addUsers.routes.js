const express = require("express");
const addUsers = express.Router();
const cors = require("cors");
const db = require("../database/config");
//const csrf = require("csurf");
const config = require("../database/config.json");

//const security = require("../backend/database/security");

addUsers.post("/signup", (req, res) => {
  const { id, username, email, role, userpassword } = req.body; // Destructure data from request body

  db.sequelize
    .query("CALL sp_user_add(:id, :username, :email, :role, :userpassword)", {
      type: db.sequelize.QueryTypes.INSERT,
      replacements: {
        id: id,
        username: username,
        email: email,
        role: role,
        userpassword: userpassword,
      },
    })
    .then((data) => {
      res.json({ error: false, data: data });
    })
    .catch((err) => {
      res.send({ error: true, message: `Error 767: ${err}` });
    });
});

module.exports = addUsers;
