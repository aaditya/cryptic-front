import React from "react";
import { Card, List, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function Question() {
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];

    return (
        <div>
            <Card
                title="Level 1"
                style={{ width: "25%", minWidth: "350px", marginBottom: 20, marginLeft: "auto", marginRight: "auto" }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Search
                    placeholder="Your Answer"
                    enterButton={<RightOutlined />}
                    onSearch={value => console.log(value)}
                />
            </Card>

            <List
                header={<div style={{ textAlign: "center" }}><h1>Hints</h1></div>}
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item>{item}</List.Item>
                )}
            />
        </div>
    )
}