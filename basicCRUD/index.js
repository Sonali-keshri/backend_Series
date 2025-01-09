const express = require("express")
const app = express();

const userModel = require("./userModel")

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/create', async (req, res) => {
   const createdUser = await userModel.create({
        name: 'Olivia Williams',
        userName: 'olivia_20Will',
        email: 'olivia_20Will@gmail.com',
    })

    res.send(createdUser)
})

app.get('/read', async (req, res) => {
    const readData = await userModel.find()
    res.send(readData)
 })
 
 app.get('/update', async (req, res) => {
    const updatedData = await userModel.findOneAndUpdate({userName: "jiffyham_2"}, {name: "Jiffy ham Smith"}, {new: true})
    res.send(updatedData)
 })

 app.get('/delete', async (req, res) => {
    const deletedData = await userModel.findOneAndDelete({userName: "jiffyham_2"})
    res.send(deletedData)
 })

app.listen(3000 , () => {
    console.log("Server is running on port 3000");
})