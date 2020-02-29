const express = require('express');
const router = express.Router();
const axios = require('axios');


// Route: /api/weather/:number
// Route that receives a number,
// then returns that many random locations with weather data
router.get('/:number', (req, res) => {
  let latitudes = [];
  let longitudes = [];
  let weather = [];
  let randomPromises = [];
  let weatherPromises = [];


  // Request specified number of latitudes from random.org
  randomPromises.push(
    axios.get(`https://www.random.org/integers/?num=${req.params.number}&min=-89&max=89&col=1&base=10&format=plain&rnd=new`)
      .then(response => {
        try {
          latitudes = response.data.trim().split('\n').map(item => {
            return parseInt(item)
          });
        }
        catch {
          latitudes.push(parseInt(response.data))
        }
    })
  )

  // Request specified number of longitudes from random.org
  randomPromises.push(
    axios.get(`https://www.random.org/integers/?num=${req.params.number}&min=-180&max=180&col=1&base=10&format=plain&rnd=new`)
      .then(response => {
        try {
          longitudes = response.data.trim().split('\n').map(item => {
            return parseInt(item)
          });
        }
        catch {
          longitudes.push(parseInt(response.data))
        }
    })
  )

  // Wait for responses from random.org,
  // then send the specified number of requests to openweathermap.org
  Promise.all(randomPromises)
    .then(() => {
      for (i = 0; i < req.params.number; i++) {
        weatherPromises.push (
          axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitudes[i]}&lon=${longitudes[i]}&appid=8a130aade6e1eed2adc504fe084c52ad`)
            .then(response => {
              weather.push(response.data);
            })
        )
      }
    })
    // Wait for responses from openweathermap.org,
    // then send array of weather objects in the API response
    .then(() => {
      Promise.all(weatherPromises)
        .then(() => {
          res.send(weather);
        })
    })

});


module.exports = router;
