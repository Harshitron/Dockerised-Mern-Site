import { Button } from '@/components/ui/button';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';  // Import useToast hook

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();  // Initialize the toast function

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout");

      if (res.data.success) {
        toast({
          title: 'Logout Successful',
          description: res.data.message,
          variant: 'success',  // Success variant for toast
        });
        navigate('/login');  // Navigate to login page after successful logout
      }
    } catch (error) {
      toast({
        title: 'Logout Failed',
        description: 'An error occurred during logout. Please try again.',
        variant: 'error',  // Error variant for toast
      });
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='bg-gray-600'>
      <div className='flex items-center justify-between p-2'>
        <h1 className='font-bold text-lg'>Harshit Sachdeva</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
