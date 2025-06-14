console.log(process.env.REACT_APP_MYENV)
exports.APIUrl = process.env.REACT_APP_MYENV === "prod" ?  "https://test-vercel-backend-eight.vercel.app" : "https://test-vercel-backend-eight.vercel.app/";
// exports.devLink = "http://192.168.0.106:3000"// https://ecom-api-zdk9.onrender.com
