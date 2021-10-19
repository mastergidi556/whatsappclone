import axios from 'axios'

// let baseURL = "https://gifted-davinci-387b4c.netlify.app/.netlify/functions/server"
// let baseURL = "http://localhost:5000"
let baseURL = "https://my-whatsapp-server.herokuapp.com"

const instance = axios.create({
    baseURL: baseURL
})

export default instance