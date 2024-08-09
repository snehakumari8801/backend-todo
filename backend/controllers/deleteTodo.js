const Todo = require("../models/Todo");


exports.deleteTodo = async(req,res) =>{
    try{
      const {id} = req.params;
      const deletedtodo = await Todo.findByIdAndDelete({_id:id});
      console.log(deletedtodo);
      if(!deletedtodo){
        return res.status(400).json({
            success:false,
            message:"Todo not found"
          })
      }

      return res.status(200).json({
        success:true,
        message:"Todo delete successfully"
      })
      
    }catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while deleting Todo"
          })

    }
}