import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Input, Space, Button, notification } from 'antd';

import { setAuthUser } from "../actions/authUser";
import { config } from "../utils/baseUrl";

const openNotification = (message) => {
    notification.open({
        message
    });
};

export default function Spash() {
    let [loadings, setLoading] = useState(false);
    let [email, setEmail] = useState('');
    let [pass, setPass] = useState('');
    const dispatch = useDispatch();

    const loginUser = async () => {
        try {
            if (email && pass) {
                setLoading(true);
                let { data } = await axios.post(`${config.url.API_URL}/api/v1/auth/login`, { email, pwd: pass });
                localStorage.setItem('access_token', data.data)
                dispatch(setAuthUser(true));
            }
        } catch (err) {
            openNotification(err.response ? err.response.data.message : "Server Error. Please Try Again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: "100vw", height: "100vh", background: "#16161D" }}>
            <Space direction="vertical">
                <Input placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }} />
                <Input.Password placeholder="Password" onChange={(e) => { setPass(e.target.value) }} />
                <Button style={{ textAlign: "center" }} type="primary" loading={loadings} onClick={loginUser}>
                    Login
                </Button>
            </Space>
        </div>
    )
}