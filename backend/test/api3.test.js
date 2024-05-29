const request = require('supertest');
const app = require('../src/app');

describe('POST /quote', () => {
    test('Return the correct quote for normal input (Sunny day scenario)', async () => {
        const res = await request(app)
            .post('/quote')
            .send({ car_value: 6614, risk_rating: 5});

        expect(res.status).toBe(200);
        expect(res.body.monthlyPremium).toBe(27.5);
        expect(res.body.monthlyPremium).toBe(330);
    });

});
