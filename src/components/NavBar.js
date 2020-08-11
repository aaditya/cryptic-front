import React from "react";
import { useDispatch } from "react-redux";
import { Dropdown, Avatar, Menu } from "antd";
import { HomeOutlined, LineChartOutlined } from '@ant-design/icons';

import { setAuthUser } from "../actions/authUser";

const { Item } = Menu;

export default function NavBar() {
    const dispatch = useDispatch();

    const logoutUser = () => {
        localStorage.clear();
        dispatch(setAuthUser(false));
    }

    const menu = (
        <Menu>
            <Item key="logout" onClick={logoutUser}>
                Logout
            </Item>
        </Menu>
    );

    return (
        <>
            <div>
                <Menu mode="horizontal" defaultSelectedKeys={['home']}>
                    <Item icon={<HomeOutlined />} key="home">Home</Item>
                    <Item icon={<LineChartOutlined />} key="board">Leaderboard</Item>
                </Menu>
            </div>
            <Dropdown overlay={menu}>
                <div className="flex-avatar-center">
                    <Avatar src="https://api.adorable.io/avatars/285/tylermcginnis" style={{ marginRight: 16 }} />
                    <span>Dummy</span>
                </div>
            </Dropdown>
        </>
    )
}