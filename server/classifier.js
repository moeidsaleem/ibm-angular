



var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
    "username": "b510e2fd-831e-4dba-b924-5c1ece031f30",
    "password": "VE64vAFb2DhD",
  'version_date': '2017-02-27'
});



module.exports.analyze  = function(input, callback){
  var parameters = {
    'text': input,
    'features': {
      'entities': {
        'emotion': true,
        'sentiment': true,
        'limit': 1
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 1
      },
      'categories':{
          'limit':1
      }
    }
  }
return natural_language_understanding.analyze(parameters,callback);
  
}


/* 


{
    "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
    "username": "b510e2fd-831e-4dba-b924-5c1ece031f30",
    "password": "VE64vAFb2DhD"
  }
  
  */