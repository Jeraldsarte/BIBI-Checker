const express = require("express");
const api = express.Router();
const db = require("../database/config");
const jwt = require("jsonwebtoken");

api.post("/login", (req, res) => {
  db.sequelize
    .query("CALL sp_users_login(:username, :password)", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        username: req.body.username,
        password: req.body.password,
      },
    })
    .then((data) => {
      const data_ret = db.MultiQueryResult(data);
      const userDetails = [data_ret.result0[0]]; // Wrap the user details in an array
    })
    .catch((err) => {
      res.send({ error: true, message: "No data found" });
    });
});

api.post("/verify-token", (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    res.json({ error: true, message: "Invalid token" });
    return;
  }

  const token = authorizationHeader.substring(7);

  jwt.verify(token, process.env.PUBLICVAPIDKEY, (err, decoded) => {
    if (err) {
      res.json({ error: true, message: "Invalid token" });
    } else {
      const userDetails = decoded.data;
      // Perform additional validation or database checks if required
      res.json({ error: false, userDetails });
    }
  });
});

const Sequelize = require("sequelize"); // Assuming Sequelize is installed

api.post("/add", async (req, res) => {
  try {
    const { id_no, name, address, username, password } = req.body;

    // Validate user input (e.g., using a validation library)

    const transaction = await db.sequelize.transaction(); // Start a transaction

    try {
      const result = await db.sequelize.query(
        "CALL sp_users_add(:id_no, :name, :address, :username, :password)",
        {
          replacements: {
            id_no: parseInt(id_no),
            name,
            address,
            username,
            password,
          },
          transaction, // Pass the transaction object
        }
      );

      const ret = result[0]["_ret"];

      if (ret === "no_employee_from_ismis") {
        res.send({ error: true, message: "Employee does not exist in ISMIS." });
      } else if (ret === "employee_duplicate") {
        res.send({ error: true, message: "Account already exists." });
      } else if (ret === "name_does_not_match") {
        res.send({
          error: true,
          message:
            "Name does not match the employee associated with the ID number.",
        });
      } else if (ret === "name_and_id_does_not_match") {
        res.send({
          error: true,
          message: "Both name and ID number do not match the employee record.",
        });
      } else {
        res.send({ error: false, message: "Employee added successfully!" });
      }

      await transaction.commit(); // Commit the transaction if successful
    } catch (err) {
      await transaction.rollback(); // Rollback the transaction on error
      console.error("Error adding employee:", err);
      res.send({
        error: true,
        message: "An error occurred while adding the employee.",
      });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send({ error: true, message: "Internal server error." });
  }
});

module.exports = api;
