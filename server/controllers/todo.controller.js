import { Todo } from "../models/todo.model.js";

export const createTodo = async (req,res) => {
    try {
        const {title, description} = req.body;

        if(!title || !description) {
            return res.status(400).json({
                status: false,
                message: "Please fill in all fields."
            });
        }

        const todo = new Todo({title,description});
        await todo.save();

        return res.status(201).json({
            status: true,
            message: "Todo created successfully.",
            todo
        })

    } catch (error) {
        console.log(error)
    }
}

export const getAllTodos = async(req,res) => {
    try {
        const todos = await Todo.find();

        return res.status(200).json({
            status: true,
            todos
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateTodo = async (req,res) => {
    try {
        const todoId = req.params.todoId;
        const {title} = req.body;

        const todo = await Todo.findByIdAndUpdate(todoId, {title}, {new:true});
        await todo.save();

        return res.status(200).json({
            status: true,
            message: "Todo updated successfully.",
            todo
        })

    } catch (error) {
        console.log(error);
    }
}

export const deleteTodo = async (req,res) => {
    try {
        const todoId = req.params.todoId;
        await Todo.findByIdAndDelete(todoId);
        return res.status(200).json({
            status: true,
            message: "Todo deleted successfully."
            
        })
    } catch (error) {
        console.log(error);
    }
}