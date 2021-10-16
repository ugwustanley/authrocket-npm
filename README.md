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

### Available methods

* createAccount
    - `accepts`: 
        - email (string)
        - password (string)
        - payload (object)(optional)
    - `returns`: object
 ```js
 const user = await app.createAccount(<email>, <password>, <payload>)
```   
* login
    - `accepts`: 
        - email (string)
        - password (string)
    - `returns`: object
 ```js
 const user = await app.login(<email>, <password>)
```  
* getUser
    - `accepts`: 
        - uuid (string)
    - `returns`: object
  ```js
 const user = await app.getUser(<uuid>)
```    
* isEmailVerified
    - `accepts`:
        - uuid (string)
    - `returns`: boolean
 ```js
 const user = await app.isEmailVerified(<uuid>)
```          
* isUserLoggedIn
    - `accepts`:
        - uuid (string)
    - `returns`: boolean
 ```js
 const user = await app.isUserLoggedIn(<uuid>)
```          
* signout
     ```js
 const user = await app.signout()
```  
   
    
