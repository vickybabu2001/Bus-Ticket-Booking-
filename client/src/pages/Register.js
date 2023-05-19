import React from 'react';
import { Form, message } from 'antd';
import { Link, useNavigate } from "react-router-dom"
import "../resources/auth.css";
import axios from "axios";
const Register = () => {
  const navigate=useNavigate();
    const formSubmit = async(values) => {
        try {
            const response = await axios.post("/api/users/register", values);
            if (response.data.success) {
                message.success(response.data.message);
                navigate('/login');
            }
            else {
                message.error(response.data.message);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className='screen d-flex justify-content-center align-items-center'>
            <div className='formbox'>
                <h6 className='d-flex justify-content-center'>Registration Form</h6>
                <Form className='register d-flex  align-items-center' onFinish={formSubmit}>
                    <Form.Item name="name">
                        <input type='text' placeholder='Enter your name'></input>
                    </Form.Item>
                    <Form.Item name="email">
                        <input type='text' placeholder='Enter your email'></input>
                    </Form.Item>
                    <Form.Item name="password">
                        <input type='password' placeholder='Enter your password'></input>
                    </Form.Item>
                    <Link to="/login" className="m-2">
                        Already user login here
                    </Link>
                    <button className="btn btn-primary" type="submit">
                        Register
                    </button>
                </Form>
            </div>
        </div>
    );
}

export default Register;
