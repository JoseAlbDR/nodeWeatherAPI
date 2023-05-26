const express = require("express");
const https = require("https");
const { url } = require("inspector");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/");

  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=37.1674&lon=-3.6117&units=metric&appid=a65c6effc790af3045e015b20026024e";

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const {
        coord: coords,
        weather,
        base,
        main,
        wind,
        clouds,
        sys,
        timezone,
        id,
        name,
        cod,
      } = { ...weatherData };
      console.log(coords);

      console.log(temp);
      console.log(description);
    });
  });
});

app.use(express.static(__dirname + "/"));

app.listen(port, () => console.log(`Listening on port: ${port}`));
