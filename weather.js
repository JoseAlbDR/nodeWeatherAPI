const express = require("express");
const https = require("https");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/");
  https.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=37.1674&lon=-3.6117&units=metric&appid=a65c6effc790af3045e015b20026024e",
    (response) => {
      console.log(response);

      app.post("/", (req, res) => {
        res.send(`<p>${JSON.parse(response)}</p>`);
      });
    }
  );
});

app.use(express.static(__dirname + "/"));

app.listen(port, () => console.log(`Listening on port: ${port}`));
