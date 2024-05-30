import React, { useState } from 'react';
import axios from 'axios';
import styles from './Forms.module.css';

const QuoteForm = () => {
    const [carValue, setCarValue] = useState('');
    const [riskRating, setRiskRating] = useState('1');
    const [monthlyPremium, setMonthlyPremium] = useState(null);
    const [yearlyPremium, setYearlyPremium] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMonthlyPremium(null);
        setYearlyPremium(null);

        try {
            const response = await axios.post('http://localhost:3000/quote', {
                car_value: Number(carValue),
                risk_rating: Number(riskRating),
            });
            setMonthlyPremium(response.data.monthly_premium);
            setYearlyPremium(response.data.yearly_premium);
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className={styles.carValueFormContainer}>
            <h2>3. Quote Calculator</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <label>Risk:</label>
                <select id="risk" value={riskRating} onChange={(e) => setRiskRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="value">Car Value:</label>
                <input
                    type="number"
                    value={carValue}
                    onChange={(e) => setCarValue(e.target.value)}
                    required
                />
              </div>
              <button type="submit">Calculate</button>
            </form>
            <h3>Monthly Premium: {monthlyPremium && `$${monthlyPremium.toFixed(2)}`}</h3>
            <h3>Yearly Premium: {yearlyPremium && `$${yearlyPremium.toFixed(2)}`}</h3>
            {error && <h3>Error: {error}</h3>}
        </div>
    );
};

export default QuoteForm;
