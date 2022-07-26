// Require
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

// .env
const dotenv = require('dotenv')
dotenv.config()

// API Key
const textapi = process.env.MC_API_KEY

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors
const cors = require('cors')
app.use(cors());

// Express
const app = express()
app.use(express.static('dist'))
// console.log(__dirname)

// Routes
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

 // Post route for user input
 app.post("/post", async (req, res)=>{
    try {
        const userInput = await req.body.text
        const data = await getMeaningCloudData(userInput) // Send user input data to api call function
        res.send(data)
    }catch(error){
        console.log("error", error)
    }
 })

  // Meaning Cloud API call
  const getMeaningCloudData = async (text)=>{
    const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key="
    const apiKey = process.env.API_KEY
    const result = await fetch(`${baseUrl}${apiKey}&txt=${text}&lang=en`)
    try {
        const response = await result.json()
        //Return the analysed result from meaningcloud service
        console.log(response)
        return response
    } catch(error) {
        console.log("error", error)
    }
} 