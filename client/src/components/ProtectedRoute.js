import axios from 'axios';
import { message } from "antd";
import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { SetUser } from "../redux/usersSlice";
import Spinner from './Spinner';
import Layout from './Layout';
const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.alerts);
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const validateToken = async () => {
        try {
            dispatch(ShowLoading());
            const res = await axios.post("/api/users/getbyid", {}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("tokenprivate",res.data.data);
            dispatch(HideLoading());
            if (res.data.success) {

                dispatch(SetUser(res.data));
            }
            else {

                localStorage.removeItem("token");
                message.error(res.data.message);
                navigate('/login')
            }
        } catch (error) {
            dispatch(HideLoading());
            localStorage.removeItem("token");
            message.error(error.data.message);
            navigate('/login');
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken();
        } else {
            navigate("/login");
        }

    }, []);
    
    return (
        <div>{user !== null && <Layout>{children}</Layout>}</div>
    );
}

export default ProtectedRoute;
