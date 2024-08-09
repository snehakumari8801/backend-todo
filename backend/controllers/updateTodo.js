const Todo = require("../models/Todo");

exports.updateTodo = async(req,res) =>{
    try{
        const { title, description} = req.body;
        const { id } = req.params;

        if(!title || !description || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const updatedtodo = await Todo.findByIdAndUpdate({_id:id},
            {title,description , createdAt:Date.now()})
        console.log(updatedtodo);
       
        return res.status(200).json({
            success:true,
            message:"Todo update successfully"
        })

    }catch(error){
      console.log(error.message);
      return res.status(402).json({
        success:false,
        message:"Todo not updated"
    })
    }
}