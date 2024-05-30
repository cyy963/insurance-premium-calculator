const express = require('express');
const cors = require('cors');
const calculateCarValue = require('./carValue');
const calculateRiskRating = require('./riskRating');
const calculatePremium = require('./quote')

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

app.post('/risk-rating', (req, res) => {
  const claimHistory  = req.body.claim_history;
  try {
    const riskRating = calculateRiskRating(claimHistory);
    res.json(riskRating);
} catch (e) {
    res.status(400).json({ error: e.message });
}

});

app.post('/quote', (req, res) => {
  const { car_value, risk_rating } = req.body;

  if (typeof car_value !== 'number' || typeof risk_rating !== 'number' || risk_rating < 1 || risk_rating > 5) {
      return res.status(400).json({ error: "there is an error" });
  }

  try {
      const premiums = calculatePremium(car_value, risk_rating);
      res.json(premiums);
  } catch (e) {
      res.status(400).json({ error: e.message });
  }
});

module.exports = app;
