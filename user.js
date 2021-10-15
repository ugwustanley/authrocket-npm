const Authrocket = require('./index')

const app = Authrocket.initializeApp({
    apiKey: 'Z8NCDZW-D0Y4SZ0-MC2KRWD-5V9P7TG',
    appName: "ugwustanley"
})

try{
    app.createAccount("ugwustanley206@gmail.com", "123456").then(data => console.log(data, 'register'))
    // console.log(user)
}
catch(err){
    console.log(err," i catched some error")
}

console.log(" i catched some error")
setTimeout(() => app.login("ugwustanley206@gmail.com", "123456").then(data => console.log(data, "login")).catch(err => console.log(err, "login")), 3000)

//setTimeout(() => app.isEmailVerified("f042d37f-ce84-4a3f-84d0-8d988cdc7d07").then(data => console.log(data)).catch(err => console.log(err, "verificaion")), 6000)

setTimeout(() => app.getUser("f042d37f-ce84-4a3f-84d0-8d988cdc7d07").then(data => console.log(data, 'user')).catch(err => console.log(err, "user")), 7000)

// if(user){
//     console.log(user)
// }