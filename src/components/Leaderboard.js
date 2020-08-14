import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from 'antd';

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
            render: text => <p>{text}</p>,
        },
        {
            title: 'Completed On',
            dataIndex: 'date',
            key: 'date',
            render: text => new Date(text).toDateString()
        },
        {
            title: 'Time Spent (hh:mm:ss)',
            dataIndex: 'time',
            key: 'time',
            render: text => {
                let tm = parseFloat(text);
                let hours = tm / 60;
                let fh = parseInt(hours);
                let minutes = (hours - fh) * 60;
                let fm = parseInt(minutes);
                let seconds = (minutes - fm) * 60;
                let fs = parseInt(seconds);
                return `${fh}:${fm}:${fs}`
            }
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
        }
    ];

    useEffect(() => {
        if (source) {
            setBoard(Object.values(source).map((b, i) => ({ ...b, key: i })));
        }
    }, [source]);

    return (
        <Table columns={columns} dataSource={board} />
    )
}