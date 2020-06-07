const router = require("express").Router()

const Accounts = require("./AccountsModel")

const AccountsController = require("./AccountsController")
const ac = new AccountsController()

router.get("/", async (req, res, next) => {
    try {
        const entries = await Accounts.find()
        res.json(entries)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const accounts = new Accounts(req.body)
        const createdEntry = await accounts.save()
        res.json(createdEntry)
    } catch (error) {
        if (error.name == "ValidatorError") {
            res.status(422)
        }
        next(error)
    }
})

router.get("/foruser/", async(req, res, next) => {
    console.log(req.query)
    try {
        const accounts = await Accounts.find({"_id": req.query.id})
        res.json(accounts)
        console.log(accounts)
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const entry = await Accounts.findById(req.params.id)

        let response = ac.sortAccountStatsEntries(entry)

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.put("/:id", async (req, res, next) => {

    let body = ac.removeEmptiesFromBody(req.body)

    try {
        const updatedAccount = await Accounts.updateOne(
            {
                _id: req.params.id
            },
            body
        )
        res.json(updatedAccount)
    } catch (error) {
        if (error.name == "ValidatorError") {
            res.status(422)
        }
        next(error)
    }
})

router.get("/latest/:id", async (req, res, next) => {
    try {
        const entry = await Accounts.findById(req.params.id)

        let response = ac.sortAccountStatsEntries(entry)
        response = ac.removeAllStatsExceptFirst(response)

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.put("/postsdata/:id", async (req, res, next) => {
        try {
            const updatedAccount = await Accounts.updateOne(
                {
                    _id: req.params.id,
                    "posts.postID": req.body.postID
                },
                {
                    $set: {
                        "posts.$": req.body
                    }
                },
                {
                    multi: true
                }
            )

            if(updatedAccount.nModified == 0){

                const postAccount = await Accounts.updateOne(
                    {
                        _id: req.params.id
                    },
                    {
                        $push: {
                            posts: req.body
                        }
                    }
                )

                res.json(postAccount)

            }else {
                res.json(updatedAccount)
            }
            
        } catch (error) {
            if (error.name == "ValidatorError") {
                res.status(422)
            }
            next(error)
        }
})

router.put("/shortstats/:id", async (req, res, next) => {
    try {
        const pushAccount = await Accounts.updateOne(
            {
                _id: req.params.id
            },
            {
                $push: {
                    shortTermStats: req.body
                }
            }
        )
        
        const pullAccount = await Accounts.updateOne(
            {
                _id: req.params.id
            },
            {
                $pull: {
                    shortTermStats: {
                        date: {
                            $lt: (Date.now() - 24*60*60*1000)
                        }
                    }
                }
            }
        )

        res.json({pushAccount, pullAccount})
    } catch (error) {
        if (error.name == "ValidatorError") {
            res.status(422)
        }
        next(error)
    }
})

router.put("/longstats/:id", async (req, res, next) => {
    try {
        const pushAccount = await Accounts.updateOne(
            {
                _id: req.params.id
            },
            {
                $push: {
                    longTermStats: req.body
                }
            }
        )
        
        res.json(pushAccount)
    } catch (error) {
        if (error.name == "ValidatorError") {
            res.status(422)
        }
        next(error)
    }
})

module.exports = router