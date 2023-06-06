require("dotenv").config()
const app = require("./app.js")
const port = process.env.PORT

app.listen(port, ()  => {
    console.log(`Fruity API listening on port ${port}`)
})