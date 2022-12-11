const express = require('express')
const Tutor = require('../model/model').userDB

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const data = new Tutor(req.body)
        const response = await data.save()
        res.redirect(`/tutorProfile/${response._id}`)

    } catch (error) {
        console.log(error);
        res.status(400).redirect('/error')
    }
})
router.post('/signin', async (req, res) => {
    const { em, ps } = req.body;

    try {
        const response = await Tutor.findOne({ email: em });
        console.log(ps, response.Password);
        if (ps == response.Password) {
            res.redirect(`/tutorProfile/${response._id}`)
        } else {
            res.status(401).send({ message: "Invalid Credentials" })
        }
    } catch (error) {
        res.status(500).send({ messsage: "Please Create Account" })
    }
})


router.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    console.log(id);
    try {
        const response = await Tutor.deleteOne({ _id: id })
        res.redirect('/')
    } catch (error) {
        res.send("Can't Perform Action")
    }
})

router.post('/update/:id', async (req, res) => {
    const id = req.params.id
    try {
        console.log(req.body)
        const response = await Tutor.findOneAndUpdate({ _id: id }, req.body)
        console.log(response);
        res.redirect(`/tutorProfile/${id}`)
    } catch (error) {

    }
})

module.exports = router



