const router = require(`express`).Router()

const usersModel = require(`../models/users`)

const bcrypt = require('bcryptjs');  // needed for password encryption

const jwt = require('jsonwebtoken')





// IMPORTANT
// Obviously, in a production release, you should never have the code below, as it allows a user to delete a database collection
// The code below is for development testing purposes only 
router.post(`/users/reset_user_collection`, (req, res) => {
    usersModel.deleteMany({}, (error, data) => {
        if (data) {
            const adminPassword = `123!"£qweQWE`
            bcrypt.hash(adminPassword, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
                usersModel.create({ name: "Administrator", email: "admin@admin.com", password: hash, accessLevel: parseInt(process.env.ACCESS_LEVEL_ADMIN) }, (createError, createData) => {
                    if (createData) {
                        // const token = jwt.sign({email:data.email, accessLevel:data.accessLevel}, process.env.JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})     

                        res.json(createData)
                    }
                    else {
                        res.json({ errorMessage: `Failed to create Admin user for testing purposes` })
                    }
                })
            })
        }
        else {
            res.json({ errorMessage: `User is not logged in` })
        }
    })
})


router.post(`/users/register/:name/:email/:password`, (req, res) => {
    // If a user with this email does not already exist, then create new user

    // "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"  Minimum eight characters, at least one letter and one number:
    usersModel.findOne({ email: req.params.email }, (uniqueError, uniqueData) => {
        if (uniqueData) {
            res.json({ errorMessage: `User already exists` })
        }
        else {
           
            if (req.params.name == "") {
                res.json({errorMessage: `name cant be empty`});
            }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.params.email)){
                res.json({errorMessage: `enter valid email`});
            }else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(req.params.password)){
                res.json({errorMessage: `Minimum eight characters, at least one letter and one number`});
            } else {
                bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
                    usersModel.create({ name: req.params.name, email: req.params.email, password: hash }, (error, data) => {
                        if (data) {
                            const token = jwt.sign({ email: data.email, accessLevel: data.accessLevel }, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY })

                            res.json({ name: data.name, accessLevel: data.accessLevel, token: token })
                        }
                        else {
                            res.json({ errorMessage: `User was not registered` })
                        }
                    })
                })
            }
        }
    })
})


router.post(`/users/login/:email/:password`, (req, res) => {
    usersModel.findOne({ email: req.params.email }, (error, data) => {
        if (data) {
            bcrypt.compare(req.params.password, data.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ email: data.email, accessLevel: data.accessLevel }, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY })

                    res.json({ name: data.name, accessLevel: data.accessLevel, token: token })
                }
                else {
                    res.json({ errorMessage: `User is not logged in` })
                }
            })
        }
        else {
            console.log("not found in db")
            res.json({ errorMessage: `User is not logged in` })
        }
    })
})


router.post(`/users/logout`, (req, res) => {
    res.json({})
})

// router.post(`/users/login/:email/:password`, (req,res) => 
// {



//     req.session.user = {email:data.email, accessLevel:data.accessLevel}
//     res.json({name:data.name, accessLevel:data.accessLevel})



// })

router.post(`/users/logout`, (req, res) => {
    req.session.destroy()
    res.json({})
})

module.exports = router