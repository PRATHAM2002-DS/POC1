const connection = require("../db/connect");

exports.addEmployee = async (req, res) => {
  text =
    "insert INTO users(first_name, last_name, email, mobile_number, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) ";
  const timestamp = new Date();
  values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email.toLowerCase(),
    req.body.mobile_number,
    timestamp,
    timestamp,
  ];
  try {
    const data = await connection.query(text, values);
    console.log(data);
    res.send({ msg: "database created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
