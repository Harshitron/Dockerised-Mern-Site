import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const Login = () => {
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });

    const { toast } = useToast();
    const navigate = useNavigate();  // Initialize the navigate function

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const loginHandler = async () => {
        if (!user.email.trim() || !user.password.trim()) {
            toast({
                title: "Error",
                description: "Please fill all the fields.",
                variant: "destructive",
            });
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/user/login",
                user,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast({
                    title: "Success",
                    description: res.data.message,
                    variant: "success",
                });

                // Navigate to homepage after successful login
                navigate('/');  // This will redirect to the root route ('/')
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "An error occurred. Please try again.";
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };

    return (
        <div className=''>
            <Input
                value={user.email}
                name="email"
                onChange={changeHandler}
                type="text"
                placeholder="Email"
            />
            <Input
                value={user.password}
                name="password"
                onChange={changeHandler}
                type="password"
                placeholder="Password"
            />
            <Button onClick={loginHandler}>Login</Button>
        </div>
    );
};

export default Login;
