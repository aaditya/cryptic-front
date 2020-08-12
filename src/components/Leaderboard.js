import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import { getBoard } from "../utils/getQuestion";

const columns = [
    {
        title: 'S.No',
        dataIndex: 'num',
        key: 'num',
        render: text => <p>{text}</p>,
    },
    {
        title: 'School',
        dataIndex: 'school',
        key: 'school',
        render: text => <p>{text}</p>,
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
            let fb = lb.map((b, i) => {
                return {
                    ...b,
                    key: i,
                    num: i + 1
                }
            });
            setBoard(fb);
        });
    }, []);

    return (
        <>
            <Table columns={columns} dataSource={board} />
        </>
    )
}