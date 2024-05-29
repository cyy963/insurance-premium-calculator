const request = require('supertest');
const app = require('../src/app');

describe('POST /risk-rating', () => {
    test('Return the correct risk rating for normal input (Sunny day scenario)', async () => {
        const res = await request(app)
            .post('/risk-rating')
            .send({ claim_history: "My only claim was a crash into my house's garage door that left a scratch on my car.  There are no other crashes." });

        expect(res.status).toBe(200);
        expect(res.body.risk_rating).toBe(3);
    });
    test('Exclude the word "bumper" in the count', async () => {
        const res = await request(app)
            .post('/risk-rating')
            .send({ claim_history: "I scratched my bumper when I collided with a wall." });

        expect(res.status).toBe(200);
        expect(res.body.risk_rating).toBe(2);
    });
    test('Case insensitivity', async () => {
        const res = await request(app)
            .post('/risk-rating')
            .send({ claim_history: "I BUMPED INTO A KERB. ANOTHER TIME I SMASHED INTO A BARRIER." });

        expect(res.status).toBe(200);
        expect(res.body.risk_rating).toBe(2);
    });
    test('Empty input', async () => {
        const res = await request(app)
            .post('/risk-rating')
            .send({ claim_history: "" });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });
    test('Input is only whitespace', async () => {
        const res = await request(app)
            .post('/risk-rating')
            .send({ claim_history: "           " });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });
    test('Input is only symbols', async () => {
        const res = await request(app)
            .post('/risk-rating')
            .send({ claim_history: "%#$@#$@" });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('there is an error');
    });
    test('Keywords appear more times than maximum risk rating of 5', async () => {
        const res = await request(app)
            .post('/risk-rating')
            .send({ claim_history: "Crashed crashed bump collided scratched collide" });
        expect(res.status).toBe(200);
        expect(res.body.risk_rating).toBe(5);
    });

});
