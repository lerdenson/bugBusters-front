import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/start'

const startGame = (request) => {
    return axios.post(baseUrl, request)
}

export default {
    startGame: startGame
}