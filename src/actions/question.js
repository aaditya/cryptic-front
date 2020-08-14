export const GET_QUESTION = 'GET_QUESTION';

export function getQuestion(question) {
    return {
        type: GET_QUESTION,
        question
    };
}
