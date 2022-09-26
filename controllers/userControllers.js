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

exports.create_user = async (phone) => {
  try {
    const text = `INSERT INTO users (phone) VALUES (${phone})`;
    let data = await (await connection).execute(text);
    console.log("hey this iscreate_user");
    console.log(data.insertId);
    // return result.insertId;
  } catch (error) {
    console.log("Hii");
    console.log(error);
    // return { err: error };
    // res.status(404).send({
    //   error: "Internal server error",
    // });
  }
};

exports.fetch_user_by_phone = async (phone) => {
  const text = `SELECT * FROM users WHERE phone = ${phone}`;

  try {
    let data = await (await connection).execute(text);
    console.log("Hello in fetchuserbyphone");
    console.log(data[0][0]);
    console.log(data[0]);
    return { data: data[0][0] };
  } catch (error) {
    console.log("Hello");
    console.log(error);
    // return { err: error };
    // res.status(404).send({
    //   error: "Internal Server error",
    // });
  }
};

exports.fetch_user_by_id = async (user_id) => {
  const text = `SELECT * FROM users WHERE id = ${user_id}`;
  try {
    let data = await (await connection).execute(text);
    console.log("Hoo");
    return data.rows[0];
  } catch (error) {
    console.log("Hoo");
    console.log(error);
    // return { err: error };
  }
};

exports.update_user_full_name = async (user_id, full_name) => {
  try {
    const text = `UPDATE users SET full_name =(${full_name}) WHERE id=(${user_id})`;
    let data = await (await connection).execute(text);
  } catch (error) {
    console.log(error);
  }
};

exports.update_user_mail = async (user_id, email) => {
  try {
    const text = `UPDATE users SET email = (${email}) WHERE id= (${user_id})`;
    let data = await (await connection).execute(text);
  } catch (error) {
    console.log(error);
  }
};

exports.update_user_linkedin_url = async (user_id, linkedin_url) => {
  try {
    const text = `UPDATE users SET linkedin_url = (${linkedin_url}) WHERE id= (${user_id})`;
    let data = await (await connection).execute(text);
  } catch (error) {
    console.log(error);
  }
};

exports.update_user_about = async (user_id, about) => {
  try {
    const text = `UPDATE users SET about = (${about}) WHERE id= (${user_id})`;
    let data = await (await connection).execute(text);
  } catch (error) {
    console.log(error);
  }
};

exports.create_interest = async (name) => {
  try {
    const text = `INSERT INTO interests (name) VALUES (${name})`;
    let data = await (await connection).execute(text);
  } catch (error) {
    console.log(error);
  }
};

exports.fetch_interest_from_name = async (name) => {
  try {
    const text = `SELECT * FROM interests WHERE name =(${name})`;
    let data = await (await connection).execute(text);
  } catch (error) {
    console.log(error);
  }
};

exports.add_interest_to_user = async (user_id, interest_id) => {
  try {
    const text = `INSERT INTO users_interests (user_id, insert_id) VALUES (${user_id}, ${interest_id})`;
    let data = await (await connection).execute(text);
  } catch (error) {
    console.log(error);
  }
};

exports.get_interests_of_user = async (user_id) => {
  try {
    const text = `SELECT * FROM interests WHERE id IN (SELECT interest_id FROM users_interests WHERE user_id =(${user_id}))`;
    let data = await (await connection).execute(text);
  } catch (error) {
    console.log(error);
  }
};

exports.delete_interest_from_user = async (user_id, interest_id) => {
  try {
    const text = `DELETE FROM usrs_interests WHERE user_id = (${user_id}) AND interest_id = (${interest_id})`;
    let data = await (await connection).execute(text);
  } catch (error) {
    console.log(error);
  }
};
