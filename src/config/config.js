require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret_key_if_env_missing',
  dbConfig: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: process.env.DB_DIALECT,
    logging: console.log
  }
};