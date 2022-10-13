
var isUserAuthenticated = false

let restrictedUrls = [
    "/restricted1",
    "/restricted2"
]

/**
 * To call is user authentication is sucessful
 */
function authenticationSucessful(){
    isUserAuthenticated = true
}
  
function firewalMiddleware(request, response, next){
  
    let url = request.url
  
    //check if the requested url is restricted or not
    if (restrictedUrls.includes(url)){
  
        //if user is not authenticated
        if ( isUserAuthenticated === false){
            response.status(403)
            response.send()
            return
        }
        next() // proceed as usual because user is authenticated
        return
    }
    
    next() //proceed as usual for public urls
    
  }

module.exports.authenticationSucessful = authenticationSucessful

/**
 * a middle to restrict access to 
 * specific routes
 */
module.exports.firewalMiddleware = firewalMiddleware