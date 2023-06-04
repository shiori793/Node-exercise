let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config();

app.use('/public', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

// console.log('Hello World')

// app.get('/', (req, res) => {
//   res.send('Hello Express')
// })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', (req, res) => {
    res.json({
        "message": process.env.MESSAGE_STYLE === 'uppercase' ? "HELLO JSON" : "Hello json"
    })
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
  },(req, res) => {
    res.send({
      time: req.time
    })
  })

  app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    res.send({
      echo: word
    })
  })

  app.get('/name', (req, res) => {
    const { first, last } = req.query
    res.send({ 
      name: `${first} ${last}`
    })
  })

  app.post('/name', (req, res) => {
    const { first, last } = req.body
    res.send({ 
      name: `${first} ${last}`
    })
  })



























 module.exports = app;
