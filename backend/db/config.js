const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/database.sqlite", // For this assignment local sqlite db used as db.
});

// Authenticate to sequelize
sequelize
  .authenticate()
  .then(async function (err) {
    console.log("Connection established.");
  })
  .catch(function (err) {
    console.log("Unable to connect to database: ", err);
  });

const modelDefiners = [
  require("./models/company"),
  require("./models/person"),
  // Add more models here...
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Defining relationships
const { company, person } = sequelize.models;
company.hasMany(person);

module.exports = sequelize;
