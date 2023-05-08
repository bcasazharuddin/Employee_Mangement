const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "User",
});

conn.connect((err) => {
  if (err) {
    console.warn("error");
  } else {
    console.warn("Connected");
  }
});

module.exports = conn;
