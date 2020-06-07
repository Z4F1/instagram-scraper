const router = require("express").Router()

const accounts = require("./accounts")
const user = require("./user")

router.use("/accounts/", accounts)
router.use("/user/", user)

module.exports = router