const express = require("express");
const { Router } = require("express");
const { verifyToken } = require("../middleware/auth.middleware")

const {
  login,
  signUp,
  readToken
} = require('../controllers/auth.controller');

const {
  createUser,
  findUserById,
  findAll,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller.js");

const {
  createBootcamp,
  findById,
  addUserB,
  findAllB,
} = require("../controllers/bootcamp.controller.js");

const router = Router();

router.post("/api/usuarios", createUser);
router.get("/api/usuarios/:id", verifyToken, findUserById);
router.get("/api/usuarios/", verifyToken, findAll);
router.put("/api/usuarios/:id", verifyToken, updateUserById);
router.delete("/api/usuarios/:id", verifyToken, deleteUserById);

router.post("/api/bootcamps", verifyToken, createBootcamp);
router.post("/api/bootcamps/adduser", verifyToken, addUserB);
router.get("/api/bootcamps/:id", verifyToken, findById);
router.get("/api/bootcamp/", findAllB);

router.post('/api/login', login)
router.post('/api/signUp', signUp)
router.post('/api/readToken', verifyToken, readToken)

module.exports = router;
