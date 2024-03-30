const express = require('express')
const {register} = require('../controller/user')
module.exports = app =>{
    
    const router = express.Router();

    router.post('/registrarme',register);
    router.get('/getPhone',(req,res)=>{
        console.log("hola")
        const phone = [
            {name: 'Samsung Galaxy 21',price: 200},
            {name: 'Iphone 12',price: 300},
            {name: 'Oppo 21',price: 400},
            {name: 'Motorola 21',price: 500},
            {name: 'Pixie 21',price: 600},  
            {name: 'Xiamo 21',price: 700}
        ]
        console.log(phone)
        res.send(phone)        
    })
    return router
}