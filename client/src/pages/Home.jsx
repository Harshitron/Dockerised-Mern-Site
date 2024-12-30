import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { toast } = useToast();
    const [todos, setTodos] = useState([]);

    const addTodoHandler = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/todo", 
                { title, description }, 
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }
            );

            if (res.data.status) {
                toast({
                    title: 'Success',
                    description: res.data.message || 'Todo item added successfully',
                    variant: 'success',
                });
                setTitle('');
                setDescription('');
                fetchTodo();
            } else {
                toast({
                    title: 'Error',
                    description: res.data.message || "Something went wrong. Please try again.",
                    variant: 'error',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: "An error occurred while adding the todo.",
                variant: 'error',
            });
        }
    };

    const fetchTodo = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/todo", {
                withCredentials: true,
            });

            if (res.data.status) {
                setTodos(res.data.todos || []);
            } else {
                toast({
                    title: 'Error',
                    description: res.data.message || "Failed to fetch todos.",
                    variant: 'error',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: "An error occurred while fetching todos.",
                variant: 'error',
            });
        }
    };

    const deleteTodoHandler = async (todoId) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/todo/${todoId}`, {
                withCredentials: true,
            });

            if (res.data.status) {
                toast({
                    title: 'Deleted',
                    description: res.data.message || "Todo deleted successfully.",
                    variant: 'success',
                });
                fetchTodo(); // Refresh the todo list after deletion
            } else {
                toast({
                    title: 'Error',
                    description: res.data.message || "Failed to delete the todo.",
                    variant: 'error',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: "An error occurred while deleting the todo.",
                variant: 'error',
            });
        }
    };

    useEffect(() => {
        fetchTodo();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex items-center gap-5 mt-5 px-5">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Add a new Task..."
                    className="w-1/4"
                />
                <Button onClick={addTodoHandler}> Add Task ➕ </Button>
            </div>
            <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Give description to your task..."
                className="w-1/4 mt-2 px-5"
            />

            <div className="mt-5 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {todos.map((todo) => (
                    <Card
                        key={todo._id}
                        className="bg-gray-800 text-white border border-gray-700 rounded-lg p-4 hover:shadow-lg hover:bg-gray-700 transition-all duration-200"
                    >
                        <CardContent>
                            <h1 className="text-xl font-bold">{todo.title}</h1>
                            <p className="mt-2 text-gray-300">{todo.description}</p>
                            <Button
                                onClick={() => deleteTodoHandler(todo._id)}
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Home;
