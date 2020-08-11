import React from "react";
import { Layout } from 'antd';

import NavBar from "./NavBar";
import Question from "./Question";

const { Header, Content } = Layout;

export default function Dashboard() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header className="header-styling">
                <NavBar />
            </Header>
            <Content style={{ padding: "20px 50px", marginTop: 64 }}>
                <Question />
            </Content>
        </Layout>
    )
}