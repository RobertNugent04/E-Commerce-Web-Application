const express = require('express');
const nodemailer = require('nodemailer');
const createError = require('http-errors');

const app = express();

// Add this code to allow CORS requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json()); // Add this line to parse the request body as JSON

//Code adapted from: https://nodemailer.com/about/
//                   https://www.youtube.com/watch?v=lBRnLXwjLw0

//Emails are sent to: email: contactshoes33@gmail.com
//                    password: Contact33
function sendEmail(name, email, subject, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'contactshoes33@gmail.com',
      pass: 'hdjuvhytovpbashp'
    }
  });

  const mailOptions = {
    from: 'contactshoes33@gmail.com',
    to: 'contactshoes33@gmail.com',
    subject: 'Customer Message',
    text: "Name: " + name + "\nEmail: " + email + "\nSubject: " + subject + "\nMessage: " + message
  };

  return transporter.sendMail(mailOptions);
}

// Define your routes here
app.post('/send-email', (req, res) => {

  sendEmail(req.body.name, req.body.email, req.body.subject, req.body.message)
    .then(info => {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    })
});


// Server-side global variables
require(`dotenv`).config({path:`./config/.env`})


// Database
require(`./config/db`)

app.use(require(`body-parser`).json())
app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))
app.use(require(`express-session`)({
    secret: process.env.SESSION_PRIVATE_KEY,
    resave: false,
    cookie: {secure: false, maxAge: 60000}, 
    saveUninitialized: true
}))




// Routers
app.use(require(`./routes/cars`))
app.use(require(`./routes/users`))
app.use(require(`./routes/sales`))
app.use(require(`./routes/cart`))
app.use(require(`./routes/comment`))

// Port
app.listen(process.env.SERVER_PORT, () => 
{
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})


// Error 404
app.use((req, res, next) => {next(createError(404))})

// Other errors
app.use(function (err, req, res, next)
{
    console.error(err.message)
    if (!err.statusCode) 
    {
        err.statusCode = 500
    }
    res.status(err.statusCode).send(err.message)
})
