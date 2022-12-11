const express = require('express')
const Student = require('../model/model').student

const router = express.Router()

router.post('/', async (req, res) => {
    const { password, cpassword } = req.body
    if (password !== cpassword) {
        return res.status(400).redirect('/error')
    }
    try {

        const data = new Student(req.body)
        const response = await data.save()
        res.redirect(`/studentProfile/${response._id}`)

    } catch (error) {
        res.status(400).redirect('/error')
    }
})

router.post('/signin', async (req, res) => {
    const { em, ps } = req.body;

    try {
        const response = await Student.findOne({ semail: em });
        if (ps == response.sPassword) {
            res.redirect(`/studentProfile/${response._id}`)
        } else {
            res.status(401).send({ message: "Invalid Credentials" })
        }
    } catch (error) {
        res.status(500).send({ messsage: "Please Create Account" })
    }
})

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        const response = await Student.deleteOne({ _id: id })
        res.redirect('/')
    } catch (error) {
        res.send("Can't Perform Action")
    }
})

router.post('/update/:id', async (req, res) => {
    const id = req.params.id
    console.log(req.body)
    try {
        const response = await Student.findOneAndUpdate({ _id: id }, req.body)
        console.log(response);
        res.redirect(`/studentProfile/${id}`)
    } catch (error) {
        res.send({ message: "Can't Update" })
    }
})

module.exports = router



