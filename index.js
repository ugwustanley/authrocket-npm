
const axios = require("axios")
const ServerError = require("./errors/ServerError")

class Authentication {

    constructor(apiKey , appName){

        this.apiKey = apiKey
        this.appName = appName
// https://authrocket.herokuapp.com'
        this.request = axios.create({
            baseURL: 'https://authrocket.herokuapp.com',
            headers: {
              'Content-Type': 'application/json',
               'Authorization': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDY1MTNhLTVlM2EtNDg5Ny04ZjNjLTQwNmVhYmY4NmEwZSIsImlhdCI6MTYzNDIxODYzMCwiZXhwIjoxNjM1MDgyNjMwfQ.WxyCXOYoafZ1RMcbWnbDWmi67_FV3HA8VHi8xuzxX2qzcBNeTSYCeg-fMqZj6qmeyGoyJXVXeI_jXoDj9VJMRQ'
            }
          })
    }


    loginJSON(){

        return {

            auth:{
                apiKey: this.apiKey || '',
                appName: this.appName || ''
            },
            user:{
                email:this.email || '',
                password: this.password || ''
            }
        }

    }


    registerJSON(){

        return {
            auth:{
                apiKey: this.apiKey,
                appName: this.appName
            },
            user:{
                email:this.email || '',
                password: this.password || ""
            },
            payload: this.payload || null
        }
    }


    list(){
        console.log(this.registerJSON())
    }


    async createAccount(email, password, payload = null){
           
          if(!email) throw Error("email address not provided")
          if(!password) throw Error("user password not provided")

          this.email = email || ''
          this.password = password || ''
          this.payload = payload || null
          
          const details = this.registerJSON()

          try {
             const user =  await this.request.post('/v1/users/register', details)

             if(user){
                // if(window.localStorage){
                //     //localStorage.setItem("token", user.data.token);
                    
                //  }
                 return user.data.data
             }

             return null

          } catch (error) {
              throw new ServerError({ message: error.response.data.message })
            
          }
            
        
    }
    
    async getUser(uuid){


        try {
           const user =  await this.request.get(`/v1/users/user/${uuid}`)

           if(user){
          
               return user.data.data
           }

           return null

        } catch (error) {
            
            throw new ServerError({ message: error.response.data.message })
          
        }
    }

    async login(email, password){

        if(!email) throw Error("email address not provided")
        if(!password) throw Error("user password not provided")

        this.email = email || ''
        this.password = password || ''

        const details = this.loginJSON()

        try {
           const user =  await this.request.post('/v1/users/login', details)

           if(user){
          
               return user.data.data
           }

           return null

        } catch (error) {

            throw new ServerError({ message: error.response.data.message })
          
        }
    }

    //check if user is signed in
    async isUserSignedIn(){
        // if(window.localStorage){
        //    const token =  localStorage.getItem("token");

        //    if(token){
        //        return true
        //    }
           
        //    return false
           
        // }

        return false
    }


    // check if email address is verified
    async isEmailVerified(uuid){


        try {
           const user =  await this.request.get(`/v1/users/email/${uuid}`)

           if(user){
             
               return user.data.data
           }

           return null

        } catch (error) {
            
            throw new ServerError({ message: error.response.data.message })
          
        }
    }

    signout(){
        //  if(window.localStorage){
        //     localStorage.removeItem("token");
        //  }
    }

}




class Authrocket {

   static initializeApp({apiKey , appName}){

       if(!apiKey) throw Error("apiKey not provided")

       if(!appName) throw Error("appName not provided")

       return new Authentication(apiKey , appName)
    }
}


module.exports = Authrocket;
