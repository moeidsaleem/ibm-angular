var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var base64 = require('file-base64');
var firebase = require('firebase');
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

let classfier = require('./classifier')
var audioUrl ="https://firebasestorage.googleapis.com/v0/b/pak-currency-converter.appspot.com/o/test%2F1523150026717_efe512e6-1e9e-42c0-a63a-3db3cef57192.wav?alt=media&token=f333900d-5bec-4feb-9a1a-824b89fdaddc"

// Point static path to dist

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





  let promiseX = new Promise((resolve,reject)=>{

    
let ardx=request(audioUrl).pipe(fs.createWriteStream('song.wav'));


if(ardx)

      //STEP 2=> read the file 
  var params = {
    audio:   fs.createReadStream('song.wav'),
    content_type: 'audio/wav'
  };


  setTimeout(()=>{


      //STEP 3 => Convert Speech to Text 
speechToText.recognize(params, function(err, res) {
  if (err) console.log(err);
  console.log(JSON.stringify(res, null, 2));

  
speechToText.createRecognizeStream({ content_type: 'audio/wav' })
  .pipe(fs.createWriteStream('./transcription.txt'));



  resolve(true);


})

},3000)
}).then(res=>{
  let datax ={};

  //faltu kaam 
  var readStream = fs.createReadStream(path.join(__dirname, '/transcription.txt') , 'utf8');
let data = ''
readStream.on('data', function(chunk) {
    data += chunk;
}).on('end', function() {
    console.log(data);
    classfier.analyze(data, function(err, response) {
      if (err)
        console.log('error:', err);
      else
        //console.log(JSON.stringify(response, null, 2));
        // datax.usage = response.usage;
        // datax.language = response.language;
        // datax.keywords = response.keywords;
        // datax.categories = response.categories[0].label;
        // console.log(datax);
        return response;
    });
    

});


})














// speechToText.recognize(params, function(err, res) {
//   if (err)
//     console.log(err);
//   else
//     console.log(JSON.stringify(res, null, 2));
// });

// // or streaming
// fs.createReadStream('./resources/recording.mp3')
//   .pipe(speechToText.createRecognizeStream({ content_type: 'audio/mp3' }))
//   .pipe(fs.createWriteStream('./transcription.txt'));



  /* 
  
  {
  "url": "https://stream.watsonplatform.net/speech-to-text/api",
  "username": "3899f834-eec3-4c1a-9d1d-6842d92fbdbf",
  "password": "xfhnrcK3yXfz"
}
*/