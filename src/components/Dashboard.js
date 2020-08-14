import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Question from "./Question";
import NotFound from "./NotFound";
import Leaderboard from "./Leaderboard";

import { refreshBoard, refreshQuestion } from "../utils/question";

const { Header, Content } = Layout;

export default function Dashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        refreshQuestion().then(dispatch);
        refreshBoard().then(dispatch);
    }, [dispatch]);

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