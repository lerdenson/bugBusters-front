import axios from 'axios'
const baseUrl = 'http://localhost:8080/bugBusters'

const getQuestion = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const sendAnswer = async (dtoRequest) => {
    const response = await axios.post(baseUrl, dtoRequest)
    return response.data
}

export default {
    getQuestion: getQuestion,
    sendAnswer: sendAnswer,
}