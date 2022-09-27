const connection = require("../db/connect");
const mysql = require("mysql2/promise");

exports.create_user = async (phone) => {
  try {
    const text = `INSERT INTO users (phone) VALUES (${phone})`;
    let data = await (await connection).execute(text);
    console.log("hey this iscreate_user");
    console.log("Line no 9", data);
    console.log("Line no 10", data[0].insertId);
    const lastrowid = data[0].insertId;
    return lastrowid;
  } catch (error) {
    console.log("Hii");
    console.log(error);
  }
};

exports.fetch_user_by_phone = async (phone) => {
  const text = `SELECT * FROM users WHERE phone = ${phone}`;

  try {
    let data = await (await connection).execute(text);
    console.log("Hello in fetchuserbyphone");

    console.log("Line no 24", data);
    console.log("line no 25", data[0][0]);
    const row = data[0][0];
    return row;
  } catch (error) {
    console.log("Hello");
    console.log(error);
  }
};

exports.fetch_user_by_id = async (user_id) => {
  const text = `SELECT * FROM users WHERE id = ${user_id}`;
  try {
    let data = await (await connection).execute(text);
    console.log("Hoo");
    const row = data[0][0];
    return row;
  } catch (error) {
    console.log("Hoo");
    console.log(error);
  }
};

exports.update_user_full_name = async (user_id, full_name) => {
  try {
    const text = `UPDATE users SET full_name =${full_name} WHERE id=${user_id}`;
    let data = await (await connection).execute(text);
    const lastrowid = data[0].insertId;
    return lastrowid;
  } catch (error) {
    console.log(error);
  }
};

exports.update_user_mail = async (user_id, email) => {
  try {
    const text = `UPDATE users SET email = ${email} WHERE id= ${user_id}`;
    let data = await (await connection).execute(text);
    const lastrowid = data[0].insertId;
    return lastrowid;
  } catch (error) {
    console.log(error);
  }
};

exports.update_user_linkedin_url = async (user_id, linkedin_url) => {
  try {
    const text = `UPDATE users SET linkedin_url = ${linkedin_url} WHERE id= ${user_id}`;
    let data = await (await connection).execute(text);
    const lastrowid = data[0].insertId;
    return lastrowid;
  } catch (error) {
    console.log(error);
  }
};

exports.update_user_about = async (user_id, about) => {
  try {
    const text = `UPDATE users SET about = ${about} WHERE id= ${user_id}`;
    let data = await (await connection).execute(text);
    const lastrowid = data[0].insertId;
    return lastrowid;
  } catch (error) {
    console.log(error);
  }
};

exports.create_interest = async (name) => {
  try {
    const text = `INSERT INTO interests (name) VALUES (${name})`;
    let data = await (await connection).execute(text);
    const lastrowid = data[0].insertId;
    return lastrowid;
  } catch (error) {
    console.log(error);
  }
};

exports.fetch_interest_from_name = async (name) => {
  try {
    const text = `SELECT * FROM interests WHERE name =${name}`;
    let data = await (await connection).execute(text);
    const row = data[0][0];
    return row;
  } catch (error) {
    console.log(error);
  }
};

exports.add_interest_to_user = async (user_id, interest_id) => {
  try {
    const text = `INSERT INTO users_interests (user_id, insert_id) VALUES (${user_id}, ${interest_id})`;
    let data = await (await connection).execute(text);
    const lastrowid = data[0].insertId;
    return lastrowid;
  } catch (error) {
    console.log(error);
  }
};

exports.get_interests_of_user = async (user_id) => {
  try {
    const text = `SELECT * FROM interests WHERE id IN (SELECT interest_id FROM users_interests WHERE user_id =${user_id})`;
    let data = await (await connection).execute(text);
    const rows = data[0];
    return rows;
  } catch (error) {
    console.log(error);
  }
};

exports.delete_interest_from_user = async (user_id, interest_id) => {
  try {
    const text = `DELETE FROM usrs_interests WHERE user_id = ${user_id} AND interest_id = ${interest_id}`;
    let data = await (await connection).execute(text);
    const lastrowid = data[0].insertId;
    return lastrowid;
  } catch (error) {
    console.log(error);
  }
};
// please do correction if needed in second parameter in line number 148 and please check wether the below function is written correctly.
exports.update_user_interests = async (user_id, interests) => {
  try {
    let interest_id;
    const existing_interests = await this.get_interests_of_user();
    interests.forEach(async (interest) => {
      const _interest = await this.fetch_interest_from_name(interest);
      if (!_interest) {
        //check wether we have to declare interest_id or just assign value to it
        interest_id = await this.create_interest(interest);
      } else {
        interest_id = _interest["id"];
      }
      await this.add_interest_to_user(user_id, interest_id);
    });
    existing_interests.forEach(async (interest) => {
      if (interests.indexOf(interest["name"]) !== -1) {
        //check once
        await this.delete_interest_from_user(user_id, interest["id"]);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.fetch_potential_connection = async (user_id) => {
  try {
    const text = `SELECT * FROM users WHERE id IN (SELECT user2_id FROM potential_connections WHERE user1_id = ${user_id})`;
    const data = await (await connection).execute(text);
    const row = data[0][0];
    return row;
  } catch (error) {
    console.log(error);
  }
};
