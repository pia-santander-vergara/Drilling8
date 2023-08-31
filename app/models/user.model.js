const db = require("../config/db.config.js");
const { DataTypes: dt } = require("sequelize");

const Usuario = db.define(
  "User",
  {
    firstName: {
      type: dt.STRING,
      allowNull: false,
      unique: false,
      validate: {
        is: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i,
        len: {
          args: [2, 45],
          msg: "El nombre no puede ser de largo menor a 2",
        },
      },
    },
    lastName: {
      type: dt.STRING,
      allowNull: false,
      unique: false,
      validate: {
        is: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i,
        len: {
          args: [2, 45],
          msg: "El apellido no puede ser de largo menor a 2",
        },
      },
    },
    email: {
      type: dt.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: dt.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password field can't be empty",
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = Usuario;