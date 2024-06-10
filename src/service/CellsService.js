import axios from "axios";
const bugCellsUrl = 'http://localhost:8080/api/bugCells'
const playerCellsUrl = 'http://localhost:8080/api/playerCells'

const getBugCells = async () => {
    try {
        const response = await axios.get(bugCellsUrl)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

const getPlayersCells = async () => {
    try {
        const response = await axios.get(playerCellsUrl)
        return response.data
    } catch (e) {
        console.log(e)
    }

}

export default {
    getBugCells: getBugCells,
    getPlayersCells: getPlayersCells,
}