import axios from 'axios'

const baseUrl = 'http://localhost:8080/bugBusters'
const themesUrl = 'http://localhost:8080/api/themes'

const getQuestion = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

const sendAnswer = async (dtoRequest) => {
    try {
        const response = await axios.post(baseUrl, dtoRequest)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

const getThemes = async () => {
    try {
        const response = await axios.get(themesUrl)
        return response.data
    } catch (e) {
        console.log(e)
    }
}


export default {
    getQuestion: getQuestion,
    sendAnswer: sendAnswer,
    getThemes: getThemes
}