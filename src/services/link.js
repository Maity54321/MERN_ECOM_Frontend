console.log(process.env.REACT_APP_MYENV)
exports.APIUrl = process.env.REACT_APP_MYENV === "prod" ?  "https://ecom-api-zdk9.onrender.com" : "http://192.168.0.104:4000";
// exports.devLink = "http://192.168.0.106:3000"
