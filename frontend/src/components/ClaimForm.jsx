import React, { useState } from 'react';
import axios from 'axios';

const ClaimForm = () => {
    const [claimHistory, setClaimHistory] = useState();
    const [riskRating, setRiskRating] = useState();
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setCarValue(null);

        try {
            const response = await axios.post('http://localhost:3000/risk-rating', { claim_history: claimHistory });
            setRiskRating(response.data.risk_rating);
        } catch (error) {
            setError(error.response.data.error || 'An error occurred');
        }
    };

    return (
        <div>
            <h1>Risk Rating Calculator</h1>
            <form onSubmit={handleSubmit}>
                    <label for="text">Risk Rating Calculator:</label>
                    <br />
                    <textArea
                        id="text"
                        rows="5" cols="40"
                        value={claimHistory}
                        onChange={(e) => setClaimHistory(e.target.value)}
                        required>
                    </textArea>
                <button type="submit">Submit</button>
            </form>
            {riskRating && <h2>Risk Rating: ${riskRating}</h2>}
            {error && <h2>Error: {error}</h2>}
        </div>
    );
};

export default ClaimForm;
