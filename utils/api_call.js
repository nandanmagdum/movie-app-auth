const axios = require("axios");

const apiUrl = "https://mitt-arv-assignment-movie-app.onrender.com/";

const apiCall = () => {
    axios.get(apiUrl)
    .then((res) => {
        console.log(res.status);
        console.log(res.body);
        console.log("API CALLED TO STAY ACTIVE");
        setTimeout(apiCall, 1000*60*15);
    })
    .catch((err) => {
        console.error("Error calling the api");
        setTimeout(apiCall, 1000*60*15);
        
    });
}

module.exports = apiCall;