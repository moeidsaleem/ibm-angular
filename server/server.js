var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var base64 = require('file-base64');
var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyAI7aXrdQ3Y_nJAtfbgNMNbupiUjAru3JQ",
  authDomain: "pak-currency-converter.firebaseapp.com",
  databaseURL: "https://pak-currency-converter.firebaseio.com",
  projectId: "pak-currency-converter",
  storageBucket: "pak-currency-converter.appspot.com",
  messagingSenderId: "131798324580"
};
firebase.initializeApp(config);

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



app.post('/test', (req,res)=>{
  console.log(req.body);
  //conver this toa file 
  base64.decode(req.body.media, 'rec', function(err,filepath){
    console.log('Success')
  })
 setTimeout(()=>{
  res.json({status:'success'})

 },3000)



})




//TESTING 
app.post('/api', (req,response)=>{
  //req => operator, media 
console.log(req.body.blob);


    //   base64.decode(req.body.media, 'recording.wav', function(err, filepath) {
    //     if(err) return console.log(err);
    //     let currentImg = filepath; 
    //     console.log(filepath);
    //   // console.log(currentImg);
    // });
  var params = {
    audio: fs.createReadStream('./recording.wav'),
    content_type: 'audio/wav'
  };
})


/// WORKING 

app.post('/api2', (req,response)=>{
  //req => operator, media 
console.log(req.body.media);


let x= new Promise((resolve,reject)=>{


//new step for testing 
// fs.writeFileSync('file.wav', Buffer.from(req.body.media.replace('data:audio/wav; codecs=opus;base64,', ''), 'base64'));



  //STEP 1 => convert binary to File 
      //converting uploaded base64 to file
      base64.decode(req.body.media, 'recording.wav', function(err, filepath) {
        if(err) return console.log(err);
        let currentImg = filepath; 
        console.log(filepath);
      // console.log(currentImg);
    });

    setTimeout(()=>{
      console.log('STEP 1 Completed......');
      resolve(true);
    },2300)
 
});
  

x.then(r=>{

  //STEP 2=> read the file 
  var params = {
    audio: fs.createReadStream('./recording.wav'),
    content_type: 'audio/wav',
    //contin
  };

  //STEP 3 => Convert Speech to Text 
speechToText.recognize(params, function(err, res) {
  if (err) console.log(err)
  console.log(JSON.stringify(res, null, 2));
    // console.log(JSON.stringify(res, null, 2));
 
  //STEP 4 => Save the data to Firebase 
  // firebase.database().ref().child('results').child(req.body.operator).push().set({
  //   timestamp: firebase.database.ServerValue.TIMESTAMP,
  //   res: res
    

  // }).then(resp=>{
  //   firebase.database().ref().child('results').child(req.body.operator).once('value', (snap)=>{
  //     response.json(snap.val());
  //   })
  // })
});
});
 
   


})


app.listen(PORT, function(){
  console.log('running on PORT:'+PORT)
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