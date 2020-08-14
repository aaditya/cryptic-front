import axios from "axios";

import { config } from "./settings";
import { getQuestion } from "../actions/question";
import { getBoard } from "../actions/board";

import { openNotification } from "../components/Notification";

export const refreshQuestion = async () => {
    try {
        let options = {
            method: "get",
            url: `${config.url.API_URL}/api/v1/questions/play`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            }
        }
        let { data } = await axios(options);

        return getQuestion(data.data);
    } catch (err) {
        openNotification(err.response ? err.response.data.message : "Server Error");
        return getQuestion({});
    }
}

export const answerQuestion = async (levelId, questionId, answer) => {
    try {
        let options = {
            method: 'post',
            url: `${config.url.API_URL}/api/v1/questions/play`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            },
            data: {
                levelId: levelId,
                qId: questionId,
                answer: answer
            }
        }
        let { data } = await axios(options);

        return data.answer;
    } catch (err) {
        openNotification(err.response ? err.response.data.message : "Server Error");
        return null;
    }
}

export const refreshBoard = async () => {
    try {
        let options = {
            method: "get",
            url: `${config.url.API_URL}/api/v1/questions/leaderboard`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            }
        }
        let { data } = await axios(options);
        return getBoard(data.data);
    } catch (err) {
        openNotification(err.response ? err.response.data.message : "Server Error");
        return getBoard(null);
    }
}