const { Router } = require("express");
const { Usuario, Bootcamp } = require("../models/index");

const createBootcamp = async (req, res) => {
  const { title, cue, description } = req.body;
  try {
    const newBootcamp = await Bootcamp.create({ title, cue, description });
    return res.json(newBootcamp);
  } catch (error) {
    console.log("Ups! not created");
    return res.status(400).json(error.message);
  }
};

const addUserB = async (req, res) => {
  try {
    const { bootcamp, usuario } = req.body;
    let letBootcamp = await Bootcamp.findOne({
      where: {
        id: bootcamp,
      },
    });
    console.log(letBootcamp);
    const letUsuario = await Usuario.findOne({
      where: {
        id: usuario,
      },
    });
    await letBootcamp.addUser(letUsuario);
    res.json("It works!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const findById = async (req, res) => {
  let { id } = req.params;
  try {
    let bootcamp = await Bootcamp.findByPk(id, {
      include: [
        {
          model: Usuario,
        },
      ],
    });
    return res.json(bootcamp);
  } catch (error) {
    console.log("Ups! not found");
    return res.status(400).json(error.message);
  }
};

const findAllB = async (req, res) => {
  try {
    let usuariosConBootcamp = await Bootcamp.findAll({
      include: [
        {
          model: Usuario,
        },
      ],
    });
    return res.json(usuariosConBootcamp);
  } catch (error) {
    console.log(error);
    console.log("Ups! not found");
    return res.status(400).json(error);
  }
};

//export

module.exports = { createBootcamp, findById, addUserB, findAllB };