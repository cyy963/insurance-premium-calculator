import React, { useState } from 'react';
import axios from 'axios';

const QuoteForm = () => {
    const [carValue, setCarValue] = useState();
    const [riskRating, setRiskRating] = useState();
    const [monthlyPremium, setMonthlyPremium] = useState();
    const [yearlyPremium, setYearlyPremium] = useState();
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMonthlyPremium(null);
        setYearlyPremium(null);

        try {
            const response = await axios.post('http://localhost:3000/quote',
                { car_value: carValue, risk_rating: riskRating });
            setMonthlyPremium(response.data.monthly_premium);
            setYearlyPremium(response.data.yearly_premium);
        } catch (error) {
            setError(error.response.data.error || 'An error occurred');
        }
    };

    return (
        <div style={{marginBottom: "10px", marginTop: "10px"}}>
            <h1>Quote Calculator</h1>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="risk">Risk:</label>
                    <select id="risk" onChange={(e) => setRiskRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />
                <label htmlFor="value">Car Value:</label>
                <input
                        type="number"
                        value={carValue}
                        onChange={(e) => setCarValue(e.target.value)}
                        required
                    />
                <br />
                <button type="submit">Submit</button>
            </form>
            {monthlyPremium && <h2>Monthly Premium: ${monthlyPremium}</h2>}
            {yearlyPremium && <h2>Yearly Premium: ${yearlyPremium}</h2>}
            {error && <h2>Error: {error}</h2>}
        </div>
    );
};

export default QuoteForm;
