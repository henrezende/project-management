require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("../database/DatabaseConnection");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/auth", userRoutes);
app.use("/projects", projectRoutes);

const PORT = process.env.PORT || 3000;

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
