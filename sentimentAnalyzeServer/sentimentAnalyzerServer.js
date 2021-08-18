const express = require('express');
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {    
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL; 

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const nlu = new NaturalLanguageUnderstandingV1({
         version: '2021-03-25',
         authenticator: new IamAuthenticator({
              apikey: api_key,}),
              serviceUrl: api_url,});

    return nlu;}

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    //return res.send({"happy":"90","sad":"10"});
    const analyzeParams = { 'url': req.query.url, 
    'features': { 
        'entities': { 
            'emotion': true, 'limit': 1 } } }

    const nlu = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => { 
    console.log(analysisResults); 
    console.log(JSON.stringify(analysisResults.result.entities[0].emotion,null,2));
    return res.send(analysisResults.result.entities[0].emotion,null,2); 
    //return res.send(analysisResults); }) .catch(err => { return res.send("Could not do desired operation "+err); });
});

app.get("/url/sentiment", (req,res) => {
    //return res.send("url sentiment for "+req.query.url);
    const analyzeParams = { 'url': req.query.url, 
    'features': { 
        'entities': { 
            'sentiment': true, 'limit': 1 } } } 

    const nlu = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => { 
    console.log(analysisResults); 
    console.log(JSON.stringify(analysisResults.result.entities[0].sentiment,null,2));
    return res.send(analysisResults.result.entities[0].sentiment,null,2); });
});

app.get("/text/emotion", (req,res) => {
    //return res.send({"happy":"10","sad":"90"});
    const analyzeParams = { 'text': req.query.url, 
    'features': { 
        'entities': { 
            'emotion': true, 'limit': 1 } } }

    const nlu = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => { 
    console.log(analysisResults); 
    console.log(JSON.stringify(analysisResults.result.entities[0].emotion,null,2));
    return res.send(analysisResults.result.entities[0].emotion,null,2);     
});

app.get("/text/sentiment", (req,res) => {
    //return res.send("text sentiment for "+req.query.text);
    const analyzeParams = { 'text': req.query.url, 
    'features': { 
        'entities': { 
            'sentiment': true, 'limit': 1 } } }

    const nlu = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => { 
    console.log(analysisResults); 
    console.log(JSON.stringify(analysisResults.result.entities[0].sentiment,null,2));
    return res.send(analysisResults.result.entities[0].sentiment,null,2);        
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)});