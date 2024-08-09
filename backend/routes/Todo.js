const { createTodo } = require("../controllers/createTodo");
const { deleteTodo } = require("../controllers/deleteTodo");
const { updateTodo } = require("../controllers/updateTodo");
const { getTodo } = require('../controllers/getTodo')
const express = require("express");
const route = express.Router();

route.post("/createtodo" , createTodo);
route.delete("/deletetodo/:id", deleteTodo);
route.put("/updatetodo/:id", updateTodo);
route.get("/gettodo", getTodo);





module.exports = route;