import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/start'

const startGame = () => {
    return axios.post(baseUrl)
}

export default {
    startGame: startGame
}