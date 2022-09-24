const connection = require("../db/connect");

exports.addEmployee = async (req, res) => {
  const { first_name, last_name, email, mobile_number } = req.body;
  const timestamp = new Date();
  console.log(timestamp);

  text = `INSERT INTO employee(first_name, last_name, email, mobile_number, created_at, updated_at) VALUES ("${first_name}", "${last_name}", "${email}", "${mobile_number}","2011-03-13 02:53:50","2011-03-13 02:53:50")`;

  //   values = [first_name, last_name, email.toLowerCase(), mobile_number];
  try {
    const data = await (await connection).execute(text);
    // console.log(data);
    res.send({ msg: "database created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
