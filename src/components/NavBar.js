import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dropdown, Avatar, Menu } from "antd";
import { withRouter } from "react-router-dom";
import { HomeOutlined, LineChartOutlined } from '@ant-design/icons';

import { setAuthUser } from "../actions/authUser";

const { Item } = Menu;

function NavBar(props) {
    const { location } = props;
    const { pathname } = location;

    const dispatch = useDispatch();

    const [currentlySelected, setCurrentlySelected] = useState(
        pathname === "/" ? "home" : pathname
    );

    const handleClick = (e) => {
        setCurrentlySelected(e.key);

        if (e.key === "home") {
            return props.history.push("/");
        }

        props.history.push(`/${e.key}`);
    };

    const logoutUser = () => {
        localStorage.clear();
        dispatch(setAuthUser(false));
        props.history.push('/');
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
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['home']}
                    onClick={handleClick}
                    selectedKeys={currentlySelected}
                >
                    <Item icon={<HomeOutlined />} key="home">Home</Item>
                    <Item icon={<LineChartOutlined />} key="board">Leaderboard</Item>
                </Menu>
            </div>
            <Dropdown overlay={menu}>
                <div className="flex-avatar-center">
                    <Avatar src="https://api.adorable.io/avatars/210/cryptix" style={{ marginRight: 16 }} />
                    <span>Player</span>
                </div>
            </Dropdown>
        </>
    )
}

export default withRouter(NavBar);