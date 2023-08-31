const express = require("express");
const path = require("path");
const routerUsuarios = require("./app/routes/routes");

const app = express();

app.use(express.static(path.join(__dirname, "app", "static")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routerUsuarios);

app.listen(3000, () => console.log("Servidor ejecutando en el puerto 3000"));
