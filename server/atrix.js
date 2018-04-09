var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var base64 = require('file-base64');
var firebase = require('firebase');
let classfier = require('./classifier')
var request = require('request');
var config = {
  apiKey: "AIzaSyAI7aXrdQ3Y_nJAtfbgNMNbupiUjAru3JQ",
  authDomain: "pak-currency-converter.firebaseapp.com",
  databaseURL: "https://pak-currency-converter.firebaseio.com",
  projectId: "pak-currency-converter",
  storageBucket: "pak-currency-converter.appspot.com",
  messagingSenderId: "131798324580"
};
firebase.initializeApp(config);
var cors=require('./cors');
app.use(cors.permission)
var speechToText = new SpeechToTextV1(  {
  "url": "https://stream.watsonplatform.net/speech-to-text/api",
  "username": "3899f834-eec3-4c1a-9d1d-6842d92fbdbf",
  "password": "xfhnrcK3yXfz"
});
app.use(bodyParser.json({ limit:'100mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}));

app.use(bodyParser.json({
  type:'application/json',
  limit:'50mb'
}));


//request from clientside
// let req ={
//     operator:'operator1',
//     callDuration: 3000,
//     audio:"https://firebasestorage.googleapis.com/v0/b/pak-currency-converter.appspot.com/o/test%2F1523158500060_43ae49ed-c39b-4178-b6a9-52352e80053c.wav?alt=media&token=615d8499-bd39-4f78-b0ed-36aab5380ec2"
//     //audio:'https://firebasestorage.googleapis.com/v0/b/pak-currency-converter.appspot.com/o/test%2F1523154415783_2b963ebe-b814-4fb9-b1a9-09ecf25d79b6.wav?alt=media&token=dd246810-6ed5-4e77-a0b8-3adf63bb4da0'
// }




app.post('/chalo', (req,respx)=>{
    console.log(req.body);


request(req.body.audio).pipe(fs.createWriteStream('musical.wav')).on('finish',  function(){


    let prom = new Promise((resolve, reject)=>{

   
  //STEP 3 
  speechToText.recognize({
    audio:   fs.createReadStream('musical.wav'),
    content_type: 'audio/wav',
    profanity_filter:false,
    max_alternatives: 1,

  }, function(err, res) {
    if (err) console.log(err);
    console.log(JSON.stringify(res, null, 2));
   let b= res.results[0].alternatives[0];
   let words = b.transcript
   console.log(words);
       classfier.analyze(words, function(err, response) {
   if(err) console.log(err)

   console.log(JSON.stringify(response, null, 2));


   console.log(response.language);
   let sentiment={};
   let emotions ={};
    if(response.keywords){
        sentiment=response.keywords[0].sentiment;
         emotions= response.keywords[0].emotion ;


    }

    let finalSave ={ 
      transcript: words,
      audio: req.body.audio,
      completedAt: firebase.database.ServerValue.TIMESTAMP,
      startedAt: req.body.timestamp,
      callDuration: req.body.callDuration,
      operator:req.body.operator,
      language: response.language,
      categories: response.categories,
      characters: response.usage.text_characters,
     // sentiment: response.keywords[0].sentiment,
      //emotion:  response.keywords[0].emotion
    }
   //add the response to firebase result 
   firebase.database().ref().child('result').push().set(finalSave).then(r=>{
    respx.json(finalSave)
   }, err=>{
     console.log(err);
   })

    

   });

  

   })




    })
   
});

});




app.listen(3000, ()=>{ console.log('runnin on 3000!')})


            
      











