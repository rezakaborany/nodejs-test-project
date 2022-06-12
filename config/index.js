module.exports = {
  port: process.env.APPLICATION_PORT,
  jwt: {
    secret_key: process.env.JWT_SECRETKEY,
  }
};
