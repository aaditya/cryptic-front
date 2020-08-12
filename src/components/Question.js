import React, { useState, useEffect } from "react";
import { Card, List, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import axios from "axios";

import { config } from "../utils/settings";
import { refreshQuestion } from "../utils/getQuestion";
import { openNotification } from "../components/Notification";

const { Search } = Input;

export default function Question() {
    let [question, setQuestion] = useState({});

    useEffect(() => {
        refreshQuestion().then(setQuestion);
    }, []);

    const submitAnswer = async (value) => {
        if (!value) { return false; }
        try {
            let options = {
                method: 'post',
                url: `${config.url.API_URL}/api/v1/questions/play`,
                headers: { "x-auth-token": localStorage.getItem('access_token') },
                data: { levelId: question.lid, qId: question.qid, answer: value }
            }
            let { data } = await axios(options);
            if (data.answer) {
                refreshQuestion().then(setQuestion);
            } else {
                openNotification(data.message);    
            }
        } catch (err) {
            openNotification(err.response.data.message || "Please Try Again");
        }
    }

    return (
        <div>
            <Card
                title={`Level ${question.level}`}
                style={{ width: "25%", minWidth: "350px", marginBottom: 20, marginLeft: "auto", marginRight: "auto" }}
                cover={question.type === "image" && <img alt="example" src={question.img} />}
            >
                {question.type === "text" && <p>{question.question}</p>}
                <Search
                    placeholder="Your Answer"
                    enterButton={<RightOutlined />}
                    onSearch={submitAnswer}
                    allowClear={true}
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