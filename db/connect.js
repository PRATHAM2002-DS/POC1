const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pratham20",
  database: "serri",
});

module.exports = connection;
