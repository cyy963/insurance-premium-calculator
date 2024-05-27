const express = require('express');
const cors = require('cors');
const calculateCarValue = require('./carValue');

const app = express();

// Use CORS middleware
app.use(cors());

app.use(express.json());

app.post('/car-value', (req, res) => {
  const { model, year } = req.body;

  if (!model || typeof year !== 'number' || year < 0) {
      return res.status(400).json({ error: "there is an error" });
  }

  const carValue = calculateCarValue(model, year);

  res.json({ car_value: carValue });
});

module.exports = app;
