const sequelize = require("../db/config");

// This script is used to initialize the database.
// This will create a database.sqlite file in /db folder.
async function init() {
  const { company, person } = sequelize.models;
  // Create the tables if not present.
  await company.sync();
  await person.sync();
  console.log("Created all tables");
}

init();
