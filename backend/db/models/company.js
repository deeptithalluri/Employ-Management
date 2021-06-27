const { Sequelize, DataTypes } = require("sequelize");

// Orm that represents company in database
const Company = (sequelize) =>
  sequelize.define("company", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = Company;
