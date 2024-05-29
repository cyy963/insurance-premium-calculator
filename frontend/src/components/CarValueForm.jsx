import React, { useState } from 'react';
import axios from 'axios';
import styles from "./CarValueForm.module.css"

const CarValueForm = () => {
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [carValue, setCarValue] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setCarValue(null);

        try {
            const response = await axios.post('http://localhost:3000/car-value', { model, year: parseInt(year) });
            setCarValue(response.data.car_value);
        } catch (error) {
            setError(error.response.data.error || 'An error occurred');
        }
    };

    return (
        <div className={styles.carValueFormContainer}>
            <h1>Car Value Calculator</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <label>Model:</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label>Year:</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        min={1}
                        required
                    />
                </div>
                <button type="submit">Calculate</button>
            </form>
            {carValue && <h2>Car Value: ${carValue}</h2>}
            {error && <h2>Error: {error}</h2>}
        </div>
    );
};

export default CarValueForm;
