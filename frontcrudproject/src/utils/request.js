import axios from "axios"
// Método de requisição com a biblioteca axios
const request = (endpoint = '', method = 'GET', data = {}, token, callback = ()=>{}, callback_error = ()=>{}) => {
    axios({
        method: method,
        url: `https://back-crud-project-production.up.railway.app/api/v1/${endpoint}`,
        data: data,
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        },
    })
    .then((r)=>{
        callback(r)
    })
    .catch((error)=>{
        console.log(error)
        callback_error(error)
    })
}

export default request