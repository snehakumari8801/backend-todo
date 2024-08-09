const Todo = require("../models/Todo");

exports.getTodo = async (req, res) => {
  try {
    // Fetch all todos from the database
    const todos = await Todo.find({});
    return res.status(200).json({
      success: true,
      message: "Get todos successfully",
      data: todos // Return the array of todos
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Failed to get todos"
    });
  }
};
