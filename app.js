const express = require('express') 
const app = express()
const port = 3000

const authentication = require('./authentication')
const { HomePage } = require('./view')

//middleware = extension d'express = function


let jsonMiddleware = express.json()

app.use(express.static("public"))
app.use(jsonMiddleware)
app.use(authentication.firewalMiddleware) // on passe la fonction sans l'appeler


//exemple d'utilisation des paramètres url
app.get("/get-user/:userID", (request, response) => {

  console.log(request.params)

  let userId = request.params.userID
  console.log(userId)
  response.send(request.params)

})

//exemple utilisation des query string ?key=value dans l'url
app.get("/hello", (request, response) => {

  console.log(request.query)
  response.send(request.query)
})



/** authenticating endpoint  */
app.post("/authenticate", (request, response) => {
  let login = request.body.login
  let password = request.body.password

  //if sucess generates the token and send it to the client
  if (authentication.checkCredentials(login, password)){
    let token = authentication.authenticationSucessful(login)
    response.send({token: token})
  }
  else{
    response.status(403)
    response.send()
  }
  

})

/**
 * Returns user data as json
 */
 app.get("/restricted1", (request, response) => {
  
  
  //no need to check for authentification
  //already done in the middleware
  response.send({data:42})
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