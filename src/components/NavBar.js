import React from "react";
import { Dropdown, Avatar, Menu } from "antd";
import { HomeOutlined, LineChartOutlined } from '@ant-design/icons';


export default function NavBar() {
    const menu = (
        <Menu>
            <Menu.Item key="1">
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div>
                <Menu mode="horizontal" defaultSelectedKeys={['home']}>
                    <Menu.Item icon={<HomeOutlined />} key="home">Home</Menu.Item>
                    <Menu.Item icon={<LineChartOutlined />} key="board">Leaderboard</Menu.Item>
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