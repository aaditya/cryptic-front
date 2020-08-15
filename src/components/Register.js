import React, { useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import Recaptcha from "react-google-recaptcha";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { config } from "../utils/settings";
import { openNotification } from "../components/Notification";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 12,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 12,
        },
        sm: {
            span: 8,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function RegistrationForm(props) {
    let [captchaKey, setCaptchaKey] = useState(null);
    let [submitted, setSubmitted] = useState(false);
    let [loading, setLoading] = useState([false, false]);
    let [email, setEmail] = useState("");
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        if (captchaKey) {
            Object.assign(values, { captchaKey });
            try {
                setLoading([true, false]);
                let { data } = await axios.post(`${config.url.API_URL}/api/v1/auth/register`, values);
                openNotification(data.message);
                setEmail(values.email);
                setSubmitted(true);
            } catch (err) {
                openNotification(err.response ? err.response.data.message : "Server Error. Please Try Again");
            } finally {
                setLoading([false, false]);
            }
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    const resendEmail = async () => {
        try {
            setLoading([false, true]);
            let { data } = await axios.post(`${config.url.API_URL}/api/v1/auth/resend`, { email, type: "register" });
            openNotification(data.message);
            setSubmitted(true);
        } catch (err) {
            openNotification(err.response ? err.response.data.message : "Server Error. Please Try Again");
        } finally {
            setLoading([false, false]);
        }
    }

    return (
        <div style={{ marginTop: "7vh" }}>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                hideRequiredMark={true}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Name is required',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email is not valid',
                        },
                        {
                            required: true,
                            message: 'E-mail is required',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="school"
                    label="School Name"
                    rules={[
                        {
                            required: true,
                            message: 'School Name is required',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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

                <Form.Item label="Captcha">
                    <Recaptcha
                        sitekey="6Lev4b0ZAAAAAILha0w_efEKbl6wIKGYBVsoZycm"
                        onChange={setCaptchaKey}
                    />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the rules of the competition and accept them.
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button style={{ marginRight: "8px" }} type="primary" disabled={submitted} htmlType="submit" loading={loading[0]}>
                        Register
                    </Button>
                    <Button style={{ marginRight: "8px" }} htmlType="button" disabled={submitted} onClick={onReset}>
                        Reset
                    </Button>
                    {submitted && <Button style={{ marginRight: "8px" }} loading={loading[1]} htmlType="button" onClick={resendEmail}>
                        Resend Email
                    </Button>}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button style={{ marginRight: "8px" }} type="link" htmlType="button" onClick={() => { props.history.push('/') }}>
                        Back to Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default withRouter(RegistrationForm);