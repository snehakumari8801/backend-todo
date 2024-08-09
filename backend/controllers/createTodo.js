const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const todo = await Todo.create({ title: title, description: description });
    console.log(todo);
    return res.status(200).json({
      success: true,
      message: "Todo created successfully",
  
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "todo not created",
    });
  }
};
