const cors = require("cors")
const fruits = require('./fruits.json')
const express = require("express")
const app = express()

// const logger = require("./logger")
//app.use('logger')

app.use('/fruits', express.json())

app.get('/', (req,res) =>{
    res.send("Hello Fruit API")
})

app.get('/fruits', (req,res) =>{
    res.send(fruits)
})

app.get('/fruits/:name', (req,res) => {
    const name = req.params.name.toLowerCase()
    console.log(name)
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name);
    if(fruit == undefined){
        res.status(404).send()
    }else{
        res.send(fruit)
    }
})

// app.post('/fruits', (req, res) => {
//     const fruit = req.body
//     console.log(fruit)
//     //add the fruit
//     res.send("New fruit created.")
// })

// check if fruit is in json.
app.post('/fruits', (req, res) => {
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == req.body.name.toLowerCase())
    if(fruit != undefined){
        res.status(409).send()
    }else{
        //add the fruit
        fruits.push(req.body)
        res.status(201).send(req.body)
    }
})

app.delete('/fruits/:name', (req, res) => {
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == req.params.name.toLowerCase())
    if(fruit == undefined){
        res.status(404).send()
    }else{
        const indexToDelete = fruits.indexOf(fruit)
        fruits.splice(indexToDelete,1)
        //fruits.splice(fruits.indexOf(fruits), 1)
        res.status(204).send()
    }
})

module.exports = app