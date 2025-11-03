require('dotenv').config();

const getInfo = () => {
  return {
    name: process.env.PROJECT_NAME,
    version: process.env.VERSION,
    date: new Date().toISOString()
  };
};

module.exports = { getInfo };
