import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { openNotification } from "../components/Notification";
import { config } from "../utils/settings";

const layout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 6,
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 9,
        span: 6,
    },
};

function Forgot(props) {
    let [loadings, setLoading] = useState([false, false]);
    let [submitted, setSubmitted] = useState(false);
    let [email, setEmail] = useState("");

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            setLoading([true, false]);
            let { data } = await axios.post(`${config.url.API_URL}/api/v1/auth/forgot`, values);
            openNotification(data.message);
            setEmail(values.email);
            setSubmitted(true);
        } catch (err) {
            openNotification(err.response ? err.response.data.message : "Server Error. Please Try Again");
        } finally {
            setLoading([false, false]);
        }
    };

    const resendEmail = async () => {
        try {
            setLoading([false, true]);
            let { data } = await axios.post(`${config.url.API_URL}/api/v1/auth/resend`, { email, type: "forgot" });
            openNotification(data.message);
            setSubmitted(true);
        } catch (err) {
            openNotification(err.response ? err.response.data.message : "Server Error. Please Try Again");
        } finally {
            setLoading([false, false]);
        }
    }

    const onFinishFailed = err => {
        setLoading(false);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div style={{ marginTop: "35vh" }}>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                hideRequiredMark={true}
                style={{ height: "30vh" }}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email is not valid',
                        },
                        {
                            required: true,
                            message: 'Email is required',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button style={{ marginRight: "8px" }} type="primary" disabled={submitted} loading={loadings[0]} htmlType="submit">
                        Submit
                    </Button>
                    <Button style={{ marginRight: "8px" }} htmlType="button" disabled={submitted} onClick={onReset}>
                        Reset
                    </Button>
                    {submitted && <Button style={{ marginRight: "8px" }} loading={loadings[1]} htmlType="button" onClick={resendEmail}>
                        Resend Email
                    </Button>}
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button style={{ marginRight: "8px" }} type="link" htmlType="button" onClick={() => { props.history.push('/') }}>
                        Back to Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default withRouter(Forgot);