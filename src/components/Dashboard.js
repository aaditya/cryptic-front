import React from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Question from "./Question";
import NotFound from "./NotFound";
import Leaderboard from "./Leaderboard";

const { Header, Content } = Layout;

export default function Dashboard() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header className="header-styling">
                <NavBar />
            </Header>
            <Content style={{ padding: "20px 50px", marginTop: 64 }}>
                <Switch>
                    <Route exact path="/" component={Question} />
                    <Route exact path="/board" component={Leaderboard} />
                    <Route component={NotFound} />
                </Switch>
            </Content>
        </Layout>
    )
}