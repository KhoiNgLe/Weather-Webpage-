const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require ("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiKey = '343ff4bb18b8f94c9389a545c4497461';
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey "&units=" + unit;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const iconWeather = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" +iconWeather +"@2x.png"
      console.log (temp);
      console.log(weatherDescription);
      res.write("<p>The weather is currently " + weatherDescription);
      res.write("<h1>The temperature in London is " + temp + "degrees Celcius.</h1>");
      res.write("<img src =" +imgURL +">");
      res.send();
    })
  });
})

























app.listen (3000,function(){
  console.log ("Sever is running on port 3000");
})
