const request = require('supertest');
const app = require('../src/app');

describe('POST /quote', () => {
    test('should return the correct premiums for a valid input', async () => {
        const res = await request(app)
            .post('/quote')
            .send({ car_value: 6614, risk_rating: 5 });

        expect(res.status).toBe(200);
        expect(res.body.monthly_premium).toBeCloseTo(27.56, 2); // Corrected to match the rounded value
        expect(res.body.yearly_premium).toBeCloseTo(330.70, 2); // Corrected to match the rounded value
    });

    test('should return an error for an invalid risk rating', async () => {
        const res = await request(app)
            .post('/quote')
            .send({ car_value: 6614, risk_rating: 6 });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });

    test('should return an error for an invalid car value', async () => {
        const res = await request(app)
            .post('/quote')
            .send({ car_value: -100, risk_rating: 3 });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });

    test('should return an error for missing car value', async () => {
        const res = await request(app)
            .post('/quote')
            .send({ risk_rating: 3 });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });

    test('should return an error for missing risk rating', async () => {
        const res = await request(app)
            .post('/quote')
            .send({ car_value: 6614 });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });
});
