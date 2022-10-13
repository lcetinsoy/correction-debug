const express = require('express') 
const app = express()
const port = 3000

const authentication = require('./authentication')

//middleware = extension d'express = function


let jsonMiddleware = express.json()

app.use(express.static("public"))
app.use(jsonMiddleware)
app.use(authentication.firewalMiddleware) // on passe la fonction sans l'appeler

/**
 * public route (everyone can access)
 */
 app.get("/home", (request, response) => {
  response.send("<h1>welcome !</h1>")
 })

/** authenticating endpoint  */
app.get("/authenticate", (request, response) => {
 
  authentication.authenticationSucessful()

  response.send("authentifié!!")
  //return token / store user is successfuly authenticated

})


/**
 * Returns user data as json
 */
 app.get("/restricted1", (request, response) => {
  
  //no need to check for authentification
  //already done in the middleware
  response.json({sensitiveData:42})
})

/**
 * Returns user data as json
 */
 app.get("/restricted2", (request, response) => {
  
  
  //no need to check for authentification
  //already done in the middleware
  response.json({sensitiveData:42})
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})