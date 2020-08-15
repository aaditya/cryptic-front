import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, List, Input, Empty } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import { refreshQuestion, answerQuestion } from "../utils/question";

const { Search } = Input;

export default function Question() {
    const dispatch = useDispatch();
    const source = useSelector(state => state.question);
    let [question, setQuestion] = useState({});

    useEffect(() => {
        if (source) {
            setQuestion(source);
        }
    }, [source]);

    const submitAnswer = async (value) => {
        if (!value) { return false; }
        await answerQuestion(question.lid, question.qid, value);
        refreshQuestion().then(dispatch);
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
                <Search
                    placeholder="Your Answer"
                    enterButton={<RightOutlined />}
                    onSearch={submitAnswer}
                />
            </Card>

            <List
                header={<div style={{ textAlign: "center" }}><h1>Hints</h1></div>}
                bordered
                dataSource={question.hints}
                renderItem={item => (
                    <List.Item><a href={item.data}>{item.name}</a></List.Item>
                )}
            />
        </div>
    )
}
