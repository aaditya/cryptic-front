import React from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import NotFound from "../components/NotFound";

import Login from "../components/Login";
import Register from "../components/Register";
import Activate from "../components/Activate";
import Forgot from "../components/Forgot";
import SetPassword from "../components/SetPassword";

const { Content } = Layout;

const NotFoundSplash = () => <NotFound mode="splash" />;

export default function Spash() {
    return (
        <Content>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/activate" component={Activate} />
                <Route exact path="/forgot" component={Forgot} />
                <Route exact path="/forgot-password" component={SetPassword} />
                <Route component={NotFoundSplash} />
            </Switch>
        </Content>
    )
}