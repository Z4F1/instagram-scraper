const router = require("express").Router()

const User = require("./UserModel")

const md5 = require("md5")

router.get("/", async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const users = await User.findById(req.params.id)
        res.json(users)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const user = new User(req.body)
        const createdUser = await user.save()
        res.json(createdUser)
    } catch (error) {
        next(error)
    }
})


router.post("/login", async (req, res, next) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username, password})
        res.json(user)
    } catch (error) {
        next(error)
    }
})

module.exports = router