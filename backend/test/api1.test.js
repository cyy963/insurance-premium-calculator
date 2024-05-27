import request from 'supertest';
import { app } from '../src/app.js';

describe('POST /car-value', () => {
    test('should return the correct car value for a valid input (Sunny day scenario)', async () => {
        const res = await request(app)
            .post('/car-value')
            .send({ model: 'Civic', year: 2020 });

        expect(res.status).toBe(200);
        expect(res.body.car_value).toBe(6614);
    });

    test('should return the correct car value for a model with numbers only', async () => {
        const res = await request(app)
            .post('/car-value')
            .send({ model: '911', year: 2020 });

        expect(res.status).toBe(200);
        expect(res.body.car_value).toBe(2020);
    });

    test('should return an error for a negative year', async () => {
        const res = await request(app)
            .post('/car-value')
            .send({ model: 'Task-Force', year: -987 });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });

    test('should return an error for an empty model', async () => {
        const res = await request(app)
            .post('/car-value')
            .send({ model: '', year: 2020 });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });

    test('should return the correct car value ignoring special characters', async () => {
        const res = await request(app)
            .post('/car-value')
            .send({ model: 'Hello, World!', year: 2010 });

        expect(res.status).toBe(200);
        expect(res.body.car_value).toBe(10840);
    });
});
