const express = require('express')
const mongoose = require('mongoose')
const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// app.use(cors());
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));;

// app.use(bodyParser.json());
// app.use(express.json())
// app.use(express.urlencoded);

// const multer = require('multer');
// const upload = multer();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const DB = 'mongodb+srv://iAmritSingh:Amrit@cluster0.kwfa8lg.mongodb.net/Demo?retryWrites=true&w=majority';

mongoose.connect(DB).then(()=>{
    console.log("successfuuly connected")
}).catch((err) =>{
    console.log("connection failed")

});

const personSchema = mongoose.Schema({
    name:String,
    age:Number
});

const Person = mongoose.model('Person',personSchema);




app.get('/',function(req,res){
    res.send('Hello world');
});

app.post('/submit',function(req,res){
    console.log(req.body);
    let newperson = new Person(req.body);
    newperson.save()
        .then(newperson => {
            res.status(200).json({'newperson':'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
})

app.listen(3000,()=>{
    console.log("Server has been started");
});