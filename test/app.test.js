require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');

describe('whale/rodent manager', () => {
    it('creates a rodent', () => {
        return request(app).post('/rodents')
            .send({ species: 'Red-Crested Tree-Rat', status: 'Threatened' })
            .then(res => {
                const json = res.body;
                expect(json.species).toEqual('Red-Crested Tree-Rat');
                expect(json.status).toEqual('Threatened');
                expect(json._id).toEqual(expect.any(String));
            });
    });

    it('APP gets a rodent by its id', () => {
        return request(app).post('/rodents')
            .send({ species: 'Key Largo Woodrat', status: 'Endangered' })
            .then(createRes => {
                const { _id } = createRes.body;
                console.log(createRes.body);
                return request(app).get(`/rodents/${_id}`);
            })
            .then(getRes => {
                const rodent = getRes.body;
                console.log(rodent);
                expect(rodent._id).toEqual(expect.any(String));
            });
    });

});
