console.log(process.env.REACT_APP_MYENV)
exports.APIUrl = process.env.REACT_APP_MYENV === "prod" ?  "https://mern-ecom-vercel.vercel.app" : "https://mern-ecom-vercel.vercel.app";
// exports.devLink = "http://192.168.0.106:3000"// https://ecom-api-zdk9.onrender.com
