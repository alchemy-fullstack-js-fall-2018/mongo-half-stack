const request = require('supertest');
const app = require('../lib/app');

describe('noodles and their restaurant', () => {

    it('this creates a noodles location', () => {
        return request(app).post('/noodles')
            .send({ name: 'what the Pho', location: 'the bronx' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'what the Pho',
                    location: 'the bronx'
                });
            });
    });

}); 
