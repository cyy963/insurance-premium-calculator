const YEARLY_PREMIUM_DIVISOR = 100;
const MONTHS_IN_YEAR = 12;



function calculatePremium(carValue, riskRating) {
    if (carValue < 100 || carValue > 999999 || !Number.isInteger(carValue) || !Number.isInteger(riskRating)) {
        console.log('ff')
        console.log(carValue < 100)
        console.log(carValue > 999999)
        return 'error';
    } else {
        console.log("first")
        const yearlyPremium = (carValue * riskRating) / YEARLY_PREMIUM_DIVISOR;
        const monthlyPremium = yearlyPremium / MONTHS_IN_YEAR;
        console.log(yearlyPremium);
        console.log(monthlyPremium);

        return { monthly_premium: monthlyPremium, yearly_premium: yearlyPremium };
    }

    
}

calculatePremium(6614, 5);

module.exports = calculatePremium;