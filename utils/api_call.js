const axios = require("axios");

const apiUrl = "https://movie-app-auth.onrender.com/";

const apiCall = () => {
    axios.get(apiUrl)
    .then((res) => {
        console.log(res.status);
        console.log(res.body);
        setTimeout(apiCall, 1000*60*5);
    })
    .catch((err) => {
        console.error("Error calling the api");
        setTimeout(apiCall, 1000*60*5);
        
    });
}

module.exports = apiCall;