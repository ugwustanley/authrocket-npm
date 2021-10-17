
const axios = require("axios")
const ServerError = require("./errors/ServerError")
require("dotenv").config()

class Authentication {

    constructor(apiKey , appName){

        this.apiKey = apiKey
        this.appName = appName
        this.token = this.getKey() || null
        this.request = axios.create({
            baseURL: 'https://authrocket.herokuapp.com',
            headers: {
              'Content-Type': 'application/json',
               'Authorization': this.token || process.env.TOKEN 
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

             if(!user) new ServerError({message: 'an error occurred'})

             if(user){
                
              
                 return user.data.data
             }

             return null

          } catch (error) {
              throw new ServerError({ message: error.response.data.message })
            
          }
            
        
    }
    checkForLocalStorage(){
        try {
            localStorage.setItem('test', 'text')
            localStorage.removeItem('test')
            return true
        } catch (error) {
            return false;
        }
    }
    getKey(){
        if(this.checkForLocalStorage == true){
           return this.localStorage.getItem('token')
        }
        return null
    }
    async storeToLocalStorage(token){
        
        if(this.checkForLocalStorage() === true){
            const store = localStorage.setItem("token", token);

            if(store){ setTimeout(() => {
                    localStorage.removeItem("token");
                }, 60 * 60 * 24 * 10);}
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
              
                try {
                    await this.storeToLocalStorage(user.data.token) 
                 } catch (error) {
                    throw new ServerError({ message: error.message })
                 }
               return user.data.data
           }

           return null

        } catch (error) {

            throw new ServerError({ message: error.response.data.message })
          
        }
    }

    //check if user is signed in
    async isUserSignedIn(){

        if(this.checkForLocalStorage() == true){
           const token =  localStorage.getItem("token");

           if(token){
               return true
        }
           
           return false
           
        }

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
         if(this.checkForLocalStorage() === true){
            localStorage.removeItem("token");
         }
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
