const request = require('supertest');
const app = require('../src/app');

describe('POST /quote', () => {
    test('Return the correct quote for normal input (Sunny day scenario)', async () => {
        const res = await request(app)
            .post('/quote')
            .send({ car_value: 6614, risk_rating: 5});

        expect(res.status).toBe(200);
        expect(res.body.monthly_premium).toBe(27.5);
        expect(res.body.yearly_premium).toBe(330);
    });
    test('Invalid input, car value is zero', async () => {
        const res = await request(app)
            .post('/quote')
            .send({ car_value: 0, risk_rating: 3});

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });
    test('Invalid input, car value is a negative number', async () => {
        const res = await request(app)
            .post('/quote')
            .send({ car_value: -1000, risk_rating: 3});

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });
    test('Invalid input, car value is too high', async () => {
        const res = await request(app)
            .post('/quote')
            .send({ car_value: 999999, risk_rating: 3});

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });
    test('Invalid input, car value is not an integer', async () => {
        const res = await request(app)
            .post('/quote')
            .send({ car_value: 3350.55, risk_rating: 1 });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });

});
