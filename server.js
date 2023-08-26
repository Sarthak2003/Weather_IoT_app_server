const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// A variable to store the sensor data
let sensorData = { temperature: null, rain: null };

// Set the views directory and template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post('/updateData', (req, res) => {
  const { temperature, rain } = req.body;
  sensorData.temperature = temperature;
  sensorData.rain = rain;
  res.json({ message: 'Data updated successfully' });
});

app.get('/getData', (req, res) => {
  res.json(sensorData);
});

app.get('/', (req, res) => {
  res.render('index', { temperature: sensorData.temperature, rain: sensorData.rain });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
