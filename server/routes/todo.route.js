import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTodo).get(getAllTodos);

router
  .route("/:todoId")
  .put(isAuthenticated, updateTodo)
  .delete(isAuthenticated, deleteTodo);

export default router;
