const db = require("../config/db.config.js");
const { DataTypes: dt } = require("sequelize");

const Bootcamp = db.define(
  "Bootcamp",
  {
    title: {
      type: dt.STRING,
      allowNull: false,
      unique: true,
    },
    cue: {
      type: dt.INTEGER,
      allowNull: false,
      unique: false,
      validate: {
        isNumeric: true,
        max: 10,
        min: 5,
      },
    },
  description: {
    type: dt.STRING,
    allowNull: false,
    unique: false,
  },
},
  { timestamps: true }
);

module.exports = Bootcamp