import React, { useState } from 'react';
import axios from 'axios';

const ClaimForm = () => {
    const [claimHistory, setClaimHistory] = useState();
    const [riskRating, setRiskRating] = useState();
    const [error, setError] = useState();

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
        <div style={{marginBottom: "10px", marginTop: "10px"}}>
            <h1>Risk Rating Calculator</h1>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="claim">Claim History:</label>
                    <br />
                    <textarea
                    id="claim"
                    placeholder='Please enter your claim history.'
                        rows="5" cols="40"
                        value={claimHistory}
                        onChange={(e) => setClaimHistory(e.target.value)}
                        required>
                </textarea>
                <br />
                <button type="submit">Submit</button>
            </form>
            {riskRating && <h2>Risk Rating: {riskRating}</h2>}
            {error && <h2>Error: {error}</h2>}
        </div>
    );
};

export default ClaimForm;
