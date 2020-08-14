import { GET_BOARD } from "../actions/board";

export default function getBoard(state = null, action) {
    if (action.type === GET_BOARD) {
        return action.board;
    }
    return state;
}
