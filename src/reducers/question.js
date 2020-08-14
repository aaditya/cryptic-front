import { GET_QUESTION } from "../actions/question";

export default function getQuestion(state = null, action) {
    if (action.type === GET_QUESTION) {
        return action.question;
    }
    return state;
}
