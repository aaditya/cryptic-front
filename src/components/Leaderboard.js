import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tag } from 'antd';

export default function Leaderboard() {
    let source = useSelector(state => state.board);
    let [board, setBoard] = useState([]);

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
            render: (text, record) => <><p>{text}</p>{record.self && <Tag color='volcano' key='self'>You</Tag>}</>,
        },
        {
            title: 'Previous Level Completed On',
            dataIndex: 'date',
            key: 'date',
            render: text => new Date(text).toString()
        },
        {
            title: 'Current Level',
            dataIndex: 'level',
            key: 'level',
            render: text => <p>{parseInt(text, 10) + 1}</p>,
        }
    ];

    useEffect(() => {
        if (source) {
            setBoard(Object.values(source).map((b, i) => ({ ...b, key: i })));
        }
    }, [source]);

    return (
        <Table columns={columns} dataSource={board} pagination={false} />
    )
}