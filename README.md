# authrocket

## Installation

```bash
npm install useauthrocket
```

## Usage

```js
 import Authrocket from 'useauthrocket'
    
 const app = Authrocket.initializeApp({
           apiKey: <your api key>,
           appName: <your app name>
    })
```

Visit [authrocket website](https://authrocket.netlify.app/application) to generate an api key. appName is the name of your application and can be anything

### Available methods

* createAccount
    - `accepts`: 
        - email (string)
        - password (string)
        - payload (object)(optional)
    - `returns`: object
 ```js
 const user = app.createAccount(<email>, <password>, <payload>)
```   
* login
    - `accepts`: 
        - email (string)
        - password (string)
    - `returns`: object
 ```js
 const user = app.login(<email>, <password>)
```  
* getUser
    - `accepts`: 
        - uuid (string)
    - `returns`: object
 ```js
 const user = app.getUser(<uuid>)
```
 
* isEmailVerified
    - `accepts`:
        - uuid (string)
    - `returns`: boolean
 ```js
 const user = app.isEmailVerified(<uuid>)
```          
* isUserLoggedIn
    - `accepts`:
        - uuid (string)
    - `returns`: boolean
 ```js
 const user = app.isUserLoggedIn(<uuid>)
```  
 
* signout
```js
 app.signout()
```  