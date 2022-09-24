const connection = require("../db/connect");

// exports.addEmployee = async (req, res) => {
//   const { first_name, last_name, email, mobile_number } = req.body;
//   const timestamp = new Date();
//   console.log(timestamp);

//   //   values = [first_name, last_name, email.toLowerCase(), mobile_number];

//   try {
//     const data = await (await connection).execute("SELECT * FROM employee");
//     console.log("hello");
//     console.log(data);
//     res.send({ msg: "database created" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Internal Server Error." });
//   }
// };

exports.create_user = async (req, res, phone) => {
  try {
    const text = "INSERT INTO users (phone) VALUES (%(phone)s)";
    const data = await connection.execute(
      text,
      { phone: phone },
      function (err, result) {
        if (err) {
          console.log(err);
        }
        return result.insertId;
      }
    );
  } catch (err) {
    res.status(404).send({
      error: "Internal server error",
    });
    console.log(err);
  }
};

exports.fetch_user_by_phone = async (req, res, phone) => {
  const text = "SELECT * FROM users WHERE phone = %(phone)s";
  try {
    const data = await (await connection).execute(text, { phone: phone });
    return data.rows[0];
  } catch (error) {
    res.status(404).send({
      error: "Internal Server error",
    });
    console.log(err);
  }
};

exports.fetch_user_by_id = async (req, res, user_id) => {
  const text = "SELECT * FROM users WHERE id = %(user_id)s";
  try {
    const data = await (await connection).execute(text, { user_id: user_id });
    return data.rows[0];
  } catch (error) {
    res.status(404).send({
      error: "Internal Server error",
    });
    console.log(err);
  }
};
