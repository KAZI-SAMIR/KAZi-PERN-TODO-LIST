const Pool = require("pg").Pool;
const pool = new Pool({
  user:"samir",
  password:"samir",
  host:"localhost",
  port:"5432",
  database:"kztodo"
   
});

module.exports = pool;