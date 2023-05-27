const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const { city } = req.body;
  console.log(city);
  const apiKey = "Your API key goes here";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  console.log(url);

  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const { coord: coords, weather, name } = { ...weatherData };
      res.write(`<p>The weather is currently  ${description}</p>`);
      res.write(`<h1>The temperature in ${name}, is ${temp}C.</h1>`);
      res.write(
        `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"></img>`
      );
      res.write(`<a href="/">Back to Home</a>`);
      res.send();
      console.log(coords);
      console.log(temp);
      console.log(description);
    });
  });
});

// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a65c6effc790af3045e015b20026024e`;
// https.get(url, (response) => {
//   console.log(response.statusCode);
//   response.on("data", (data) => {
//     const weatherData = JSON.parse(data);
//     const temp = weatherData.main.temp;
//     const description = weatherData.weather[0].description;
//     const { coord: coords, weather, name } = { ...weatherData };
//     res.write(`<p>The weather is currently  ${description}</p>`);
//     res.write(`<h1>The temperature in ${name}, is ${temp}.</h1>`);
//     res.write(
//       `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"></img>`
//     );
//     res.send();
//     console.log(coords);
//     console.log(temp);
//     console.log(description);
//   });
// });

app.use(express.static(__dirname + "/"));

app.listen(port, () => console.log(`Listening on port: ${port}`));
