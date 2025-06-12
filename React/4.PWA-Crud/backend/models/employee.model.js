const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Employee = sequelize.define("Employee", {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  age: DataTypes.INTEGER,
  city: DataTypes.STRING,
  department: DataTypes.STRING,
  gender: DataTypes.ENUM("Male", "Female", "Other"),
  mobile: DataTypes.STRING,
  profile_image: DataTypes.STRING,
}, {
  timestamps: false   
});

module.exports = Employee;
