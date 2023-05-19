import React from 'react';
import "../resources/auth.css";
import {Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Form, message } from 'antd';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const formSubmit = async(values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/users/login", values);
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
               localStorage.setItem("token",response.data.token);
                navigate('/');
            }
            else {
                message.error(response.data.message);
            }
        }
        catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    return (
        <div className='screen d-flex justify-content-center align-items-center'>
        <div className='formbox'>
            <h6 className='d-flex justify-content-center'>Login Form</h6>
            <Form className='register d-flex  align-items-center' onFinish={formSubmit}>
                <Form.Item name="email">
                    <input type='text' placeholder='Enter your email'></input>
                </Form.Item>
                <Form.Item  name="password">
                    <input type='password' placeholder='Enter your password'></input>
                </Form.Item>
                <Link to="/register" className="m-2">
                       Register here
                    </Link>
                    <button className="btn btn-primary" type="submit">
                       Login
                    </button>
            </Form>
        </div>
    </div>
    );
}

export default Login;
