const express = require('express')
module.exports = app =>{
    
    const router = express.Router();

    router.post('/phone',(req,res)=>{
        const {name,price} = req.body
        console.log("do it, the name of the phone is "+ name + "and the price is " + price)
        res.send("OK")        
    });
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