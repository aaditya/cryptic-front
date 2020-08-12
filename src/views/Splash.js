import React from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import NotFound from "../components/NotFound";

import Login from "../components/Login";
import Register from "../components/Register";

const { Content } = Layout;

export default function Spash() {
    return (
        <Content>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route component={NotFound} />
            </Switch>
        </Content>
    )
}