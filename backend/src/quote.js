function calculatePremium(carValue, riskRating) {
  if (typeof carValue !== 'number' || typeof riskRating !== 'number' || carValue <= 0 || riskRating < 1 || riskRating > 5) {
    throw new Error("there is an error");
  }

  const yearlyPremium = (carValue * riskRating) / 100;
  const monthlyPremium = yearlyPremium / 12;

  return {
    monthly_premium: parseFloat(monthlyPremium.toFixed(2)),
    yearly_premium: parseFloat(yearlyPremium.toFixed(2))
  };
}

module.exports = calculatePremium;
