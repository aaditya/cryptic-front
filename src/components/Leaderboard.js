import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import { getBoard } from "../utils/getQuestion";

const columns = [
    {
        title: 'S.No',
        dataIndex: 'key',
        key: 'key',
        render: text => <p>{parseInt(text, 10) + 1}</p>,
    },
    {
        title: 'School',
        dataIndex: 'school',
        key: 'school',
        render: text => <p>{text}</p>,
    },
    {
        title: 'Completed On',
        dataIndex: 'date',
        key: 'date',
        render: text => new Date(text).toDateString()
    },
    {
        title: 'Time Spent (Hours)',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
    }
];

export default function Leaderboard() {
    let [board, setBoard] = useState([]);

    useEffect(() => {
        getBoard().then(lb => {
            setBoard(lb.map((b, i) => ({ ...b, key: i })));
        });
    }, []);

    return (
        <Table columns={columns} dataSource={board} />
    )
}