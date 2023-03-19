const router = require(`express`).Router()

const usersModel = require(`../models/users`)

const bcrypt = require('bcryptjs');  // needed for password encryption

const jwt = require('jsonwebtoken')

const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer = require('multer')
const upload = multer({ dest: `${process.env.UPLOADED_FILES_FOLDER}` })

const emptyFolder = require('empty-folder')






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
                        emptyFolder(process.env.UPLOADED_FILES_FOLDER, false, (result) => {
                            res.json(createData)
                        })
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


router.post(`/users/register/:name/:email/:password`, upload.single("profilePhoto"), (req, res) => {
    // If a user with this email does not already exist, then create new user

    // "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"  Minimum eight characters, at least one letter and one number:
    if (!req.file) {
        usersModel.findOne({ email: req.params.email }, (uniqueError, uniqueData) => {
            if (uniqueData) {
                res.json({ errorMessage: `User already exists` })
            }
            else {

                if (req.params.name == "") {
                    res.json({ errorMessage: `name cant be empty` });
                } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.params.email)) {
                    res.json({ errorMessage: `enter valid email` });
                } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$£%^&*()_+{}|:"<>?`~\-\[\]\\;',.\/])[A-Za-z\d!@#$£%^&*()_+{}|:"<>?`~\-\[\]\\;',.\/]{8,}$/.test(req.params.password)) {
                    res.json({ errorMessage: `Minimum eight characters, at least one letter and one number` });
                } else {
                    bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
                        usersModel.create({ name: req.params.name, email: req.params.email, password: hash, cart_item: 0 }, (error, data) => {
                            if (data) {
                                const token = jwt.sign({ email: data.email, accessLevel: data.accessLevel }, JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY })

                                res.json({ name: data.name, accessLevel: data.accessLevel, token: token, email: data.email, cart_item: data.cart_item })
                            }
                            else {
                                res.json({ errorMessage: `User was not registered` })
                            }
                        })
                    })
                }
            }
        })
    }
    else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (error) => { res.json({ errorMessage: `Only .png, .jpg and .jpeg format accepted` }) })
    } else {
        usersModel.findOne({ email: req.params.email }, (uniqueError, uniqueData) => {
            if (uniqueData) {
                res.json({ errorMessage: `User already exists` })
            }
            else {

                if (req.params.name == "") {
                    res.json({ errorMessage: `name cant be empty` });
                } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.params.email)) {
                    res.json({ errorMessage: `enter valid email` });
                } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$£%^&*()_+{}|:"<>?`~\-\[\]\\;',.\/])[A-Za-z\d!@#$£%^&*()_+{}|:"<>?`~\-\[\]\\;',.\/]{8,}$/.test(req.params.password)) {
                    res.json({ errorMessage: `Minimum eight characters, at least one letter, one number and a special character` });
                } else {
                    bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
                        usersModel.create({ name: req.params.name, email: req.params.email, password: hash, profilePhotoFilename: req.file.filename, cart_item: 0 }, (error, data) => {
                            if (data) {
                                const token = jwt.sign({ email: data.email, accessLevel: data.accessLevel }, JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY })

                                fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, 'base64', (err, fileData) => {
                                    console.log(req.file.filename)
                                    res.json({ name: data.name, accessLevel: data.accessLevel, profilePhoto: fileData, token: token, email: data.email, cart_item: data.cart_item })
                                })
                            }
                            else {
                                res.json({ errorMessage: `User was not registered` })
                            }
                        })
                    })
                }
            }
        })
    }
})


router.post(`/users/login/:email/:password`, (req, res) => {
    usersModel.findOne({ email: req.params.email }, (error, data) => {
        if (data) {
            bcrypt.compare(req.params.password, data.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ email: data.email, accessLevel: data.accessLevel }, JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY })

                    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${data.profilePhotoFilename}`, 'base64', (err, fileData) => {
                        if (fileData) {
                            res.json({ name: data.name, accessLevel: data.accessLevel, profilePhoto: fileData, token: token, email: data.email, cart_item: data.cart_item })
                        }
                        else {
                            res.json({ name: data.name, accessLevel: data.accessLevel, profilePhoto: null, token: token, email: data.email, cart_item: data.cart_item })
                        }
                    })
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


router.get(`/users`, (req, res) => {
    usersModel.find((error, data) => {
        res.json(data)
    })
})

router.get(`/users/:id`, (req, res) => {
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
        if (err) {
            res.json({ errorMessage: `User is not logged in` })
        }
        else {
            usersModel.findById(req.params.id, (error, data) => {
                res.json(data)
            })
        }
    })
})

router.post(`/users/logout`, (req, res) => {
    req.session.destroy()
    res.json({})
})


router.put(`/users/:id`, (req, res) => {

    console.log(req.body)

    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
        if (err) {
            res.json({ errorMessage: `User is not logged in` })
        }
        else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
            if (req.body.name == "") {
                res.json({ errorMessage: `name cant be empty` });
            } else if (req.body.email == "") {
                res.json({ errorMessage: `emailcant be empty` });
            }
            else if (!(req.body.cart_item >= 0)) {
                console.log(req.body.cart_item)
                res.json({ errorMessage: `cart items must be above or equal to 0` });
            } else {
                usersModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
                    res.json(data)
                })
            }} else {
                res.json({ errorMessage: `User is not an administrator, so they cannot edit records` })
            }
        }
    })

})

router.delete(`/users/:id`, (req, res) => {
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
        if (err) {
            res.json({ errorMessage: `User is not logged in` })
        }
        else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                usersModel.findByIdAndRemove(req.params.id, (error, data) => {
                    res.json(data)
                })
            }
            else {
                res.json({ errorMessage: `User is not an administrator, so they cannot delete records` })
            }
        }
    })
})



module.exports = router