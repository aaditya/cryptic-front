import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { withRouter } from "react-router-dom";
import axios from "axios";
import qs from "query-string";

import { config } from "../utils/settings";
import { openNotification } from "../components/Notification";

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

function SetPassword(props) {
    let [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const { uid, active } = qs.parse(props.location.search);

    const onFinish = async (values) => {
        Object.assign(values, { uid, key: active });
        try {
            setLoading(true);
            let { data } = await axios.post(`${config.url.API_URL}/api/v1/auth/set-password`, values);
            openNotification(data.message);
            setLoading(false);
            props.history.push('/');
        } catch (err) {
            openNotification(err.response ? err.response.data.message : "Server Error. Please Try Again");
            setLoading(false);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div style={{ marginTop: "35vh" }}>
            <Form
                {...layout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                hideRequiredMark={true}
            >

                <Form.Item
                    name="pwd"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Password is required',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['pwd']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('pwd') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('Passwords do not match');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button style={{ marginRight: "8px" }} type="primary" htmlType="submit" loading={loading}>
                        Set Password
                    </Button>
                    <Button style={{ marginRight: "8px" }} htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
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

export default withRouter(SetPassword);