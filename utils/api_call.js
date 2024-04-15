const axios = require("axios");

const apiUrl = "https://movie-app-auth.onrender.com/";

const apiCall = () => {
    axios.get(apiUrl)
    .then((res) => {
        console.log(res.status);
        setTimeout(apiCall, 1000*60*10);
    })
    .catch((err) => {
        console.error(err);
        setTimeout(apiCall, 1000*60*5);
        
    });
}

module.exports = apiCall;