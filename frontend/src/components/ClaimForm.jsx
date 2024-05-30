import React, { useState } from 'react';
import axios from 'axios';
import styles from "./CarValueForm.module.css"

const ClaimForm = () => {
    const [claimHistory, setClaimHistory] = useState();
    const [riskRating, setRiskRating] = useState();
    const [error, setError] = useState();3
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setRiskRating(null);

        try {
            const response = await axios.post('http://localhost:3000/risk-rating', { claim_history: claimHistory });
            setRiskRating(response.data.risk_rating);
        } catch (error) {
            setError(error.response.data.error || 'An error occurred');
        }
    };

    return (
        <div className={styles.carValueFormContainer}>
            <h2>2. Risk Rating Calculator</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer} id={styles.claim}>
                <textarea
                  placeholder='Please enter your claim history.'
                  rows="5" cols="39"
                  value={claimHistory}
                  onChange={(e) => setClaimHistory(e.target.value)}
                  required>
                </textarea>
              </div>
              <button type="submit">Calculate</button>
            </form>
            <h3>Risk Rating: {riskRating && `${riskRating}`}</h3>
            {error && <h3>Error: {error}</h3>}
        </div>
    );
};

export default ClaimForm;
