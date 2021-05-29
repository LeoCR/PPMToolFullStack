import axios from 'axios'; 
export default axios.create({
    baseURL:'https://personalprojectmanagement.herokuapp.com/',
    responseType: 'json' 
}) 