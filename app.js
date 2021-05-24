const express = require('express')
const path = require('path');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    gender: String,
    Address: String
  });
const contact = mongoose.model('contact',contactSchema);

contactSchema.methods.speak = function () {
    const greeting = this.name + this.name;
    console.log(greeting);
  }
  
  //const Kitten = mongoose.model('Kitten', kittySchema);

// app.use(express.static('static', options))

//express specific stuf
app.use('/static', express.static('static'))
app.use(express.urlencoded())

//pug specific stuf
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//endpoints
app.get('/', (req,res)=>{
    const params ={ }
    res.status(200).render('index.pug' )
})

app.post('/', (req, res)=>{
  var myData = new contact(req.body);
  myData.save().then(()=>{
  res.send("This item has been saved to the databas")
  }).catch(()=>{
  res.status(400).send("item was not saved to the databse")
});
})



//start the server
app.listen(port,()=>{
    console.log(`the application started successsfully on port ${port}`);
})
