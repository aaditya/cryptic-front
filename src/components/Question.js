import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, List, Input, Empty, Form, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import { refreshQuestion, answerQuestion } from "../utils/question";

export default function Question() {
    const dispatch = useDispatch();
    const source = useSelector(state => state.question);
    let [question, setQuestion] = useState({});
    let [answerRes, setAnswer] = useState('Answer cannot be empty');
    const [form] = Form.useForm();

    useEffect(() => {
        if (source) {
            setQuestion(source);
        }
    }, [source]);

    const submitAnswer = async (value) => {
        form.resetFields();
        let answer = await answerQuestion(question.lid, question.qid, value.answer);
        if (!answer) {
            setAnswer("Nope. Try Again !");
            form.validateFields(['answer'])
        } else {
            refreshQuestion().then(dispatch);
        }
        setAnswer('Answer cannot be empty');
    }

    if (!question.level) {
        return <Empty description="No more questions to show" />
    }

    return (
        <div>
            <Card
                title={`Level ${question.level}`}
                style={{ width: "25%", minWidth: "350px", marginBottom: 20, marginLeft: "auto", marginRight: "auto" }}
                cover={question.type === "image" && <img alt="question" src={question.question} />}
            >
                {question.type === "text" && <p>{question.question}</p>}
                <Form form={form} name="horizontal_login" layout="inline" onFinish={submitAnswer}>
                    <Form.Item
                        name="answer"
                        rules={[{ required: true, message: answerRes }]}
                    >
                        <Input placeholder="Your Answer" />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !form.isFieldsTouched(true) ||
                                    form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                                icon={<RightOutlined />}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Card>

            {question.hints.length > 0 && <List
                header={<div style={{ textAlign: "center" }}><h1>Hints</h1></div>}
                bordered
                dataSource={question.hints}
                renderItem={item => (
                    <List.Item>{item.data ? <a href={item.data}>{item.name}</a> : item.name}</List.Item>
                )}
            />}
        </div>
    )
}
