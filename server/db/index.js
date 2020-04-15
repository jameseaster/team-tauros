const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
});

connection.connect((err) => {
  if (err) {
      console.log('Error');
      return;
  } else {
      console.log('Connected to database howdy!');
  }
});

const query = util.promisify(connection.query).bind(connection);

// get all rooms from database
const getRooms = (req, res) => {
  const mysqlQuery = `SELECT * FROM rooms`;
  return query(mysqlQuery);
};

// create a party
const addParty = (req, res) => {
  const { name, password, user_id, host_id, host_location, radius, details, start, end } = req.params; // or req.body
  const mysqlQuery = `INSERT INTO rooms (name, password, user_id, host_id, host_location, radius, details, start, end) VALUES ('${name}', '${password}', ${user_id}, ${host_id}, '${host_location}', ${radius}, ${details}', ${start}, ${end})`
  return query(mysqlQuery);
}

// module.exports.getItems = getItems;
module.exports = {
  getRooms,
  addParty,
};