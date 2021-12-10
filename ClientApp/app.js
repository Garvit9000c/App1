const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const https = require('https');
var convert = require('xml-js');


const PORT = 5000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const isLogined = false;

app.get("/", (req, res) => {
  res.render("home", {isLogined: isLogined});
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res)=>{
  const user = {id: req.body.id, pass: req.body.pass};

  const url = `https://micro-okta.herokuapp.com/login?id=${user.id}&pass=${user.pass}`;
  console.log(url);

  https.get(url, (response)=> {

   response.on("data", function(data) {
      const authData = JSON.parse(data);
      console.log(authData);

      if(authData.key){
        res.redirect("/otp");
      }
    });

  });

});

app.get("/otp", (req, res) => {
  res.render('otp');
});

app.post("/otp", (req, res) => {
  const otpPin = req.body.otp;

  const url = `https://micro-okta.herokuapp.com/otp?pin=${otpPin}`;
  console.log(url);

  let otpData = '';

  https.get(url, (response) => {
    response.on("data", (data) => {
      otpData += data;
    })
    response.on('end', () => {
      let otp = JSON.parse(otpData);
      console.log(otp);
    })
  })
});

app.listen(PORT, ()=>{
  console.log(`Server is running on ${PORT}`);
})
