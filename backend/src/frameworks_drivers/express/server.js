require("dotenv").config();
const app = require("./app");
const dbConnection = require("../database/DatabaseConnection");

const PORT = process.env.PORT || 5000;

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
