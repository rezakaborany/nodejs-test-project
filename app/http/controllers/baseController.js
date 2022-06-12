const { validationResult } = require("express-validator");
const { client } = require("../../db");

exports.validationData = async function(req, res)  {
  const result =await validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    const messages = [];

    errors.forEach((err) => messages.push(err.msg));

    res.json({
      data: messages,
      success: false,
    });

    return false;
  }

  return true;
}

exports.createTable = async function()  {
  const text = `
  CREATE TABLE IF NOT EXISTS users (
      id serial PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      age numeric  NOT NULL,
      mobile numeric NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
  );`;
  await client.query(text);
  console.log("User table created");

}