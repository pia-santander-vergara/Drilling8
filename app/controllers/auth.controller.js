const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const verifyToken = require("../middleware/auth.middleware")

const login = async (req, res) => {
  const { email, password } = req.body;

  const verifyUser = await User.findOne({ where: { email } });
  if (!verifyUser) {
    return res.status(404).json({ error: "Mail is not correct" });
  }

const verifyPassword = await bcrypt.compare(password, verifyUser.password)
if(!verifyPassword) {
    return res.status(405).json({error: "Password is not correct"})
}

  const timeOut = Math.floor(new Date() / 1000) + 3600;

  const token = jwt.sign({
    exp: timeOut,
    data: {
      id: verifyUser.id,
      email: verifyUser.email,
      firstname: verifyUser.firstname,
      lastname: verifyUser.lastname,
    },
  },
    process.env.SECRET_KEY

  );

  res.json(token)
};

const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ error: "Some text field are missing" });
    }
  
    const verifyUser = await User.findOne({ where: { email } });
    if (verifyUser) {
      return res.status(404).json({ error: "Some text field are missing" });
    }
  
    try {
      const passwordEncrypt = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: passwordEncrypt,
      });
  
      const expireTime = Math.floor(new Date() / 1000) + 3600;
  
      const token = jwt.sign(
        {
          exp: expireTime,
          data: {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
          },
        },
        process.env.SECRET_KEY
      );
  
      res.json(token)
  
    } catch (error) {
      return res.status(400).json(error)
    }
  };
  
  const readToken = async (req, res) => {
      const {token} = req.body
  
      try {
          const decoded = jwt.verify(token, process.env.SECRET_KEY)
          res.json(decoded)
      } catch (error) {
          return res.status(400).json(error)
      }
  }
  
  module.exports = {
      login,
      signUp,
      readToken
  }
