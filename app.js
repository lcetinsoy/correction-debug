const express = require('express') 
const app = express()
const port = 3000

//middleware = extension d'express = function


app.use(express.static("public"))
app.use(express.json())

/**
 * Returns user data as json
 */
 app.get("/user", (request, response) => {

  console.log(request.method)
  let data = {
      "firstname": "paul",
      "age": 22
  }

  response.json(data)
})

/**
 * Returns production line data as json
 */
app.get("/production-line", (request, response) => {

  console.log(request.method)
  let data = {
    "name": "marcoussi",
    "productionRate": 200
  }
  response.json(data)

})

/**
 * Let send data from the client and display it
 */
app.post("/post-data", (request, response) => {
  
  let data = request.body
  console.log(data)

  response.json({'message': 'data received'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})