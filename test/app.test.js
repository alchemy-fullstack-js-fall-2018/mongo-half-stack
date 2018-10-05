require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const Rodents = require('../lib/models/Rodents');

describe('whale/rodent manager', () => {
    let deerMouse = { species: 'Ixtlán Deer Mouse', status: 'Threatened' };
    
    beforeEach(() => {
        Rodents.drop();
    });

    beforeEach(() => {
        return request(app).post('/rodents')
            .send(deerMouse)
            .then(newDeerMouse => {
                deerMouse = newDeerMouse.body;
            });
    });

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
                return request(app).get(`/rodents/${_id}`);
            })
            .then(getRes => {
                const rodent = getRes.body;
                expect(rodent._id).toEqual(expect.any(String));
            });
    });

    it('APP gets all rodents in an array', () => {
        let chinchilla = { species: 'Bolivian Chinchilla Rat', status: 'Threatened' };
        return request(app).post('/rodents')
            .send(chinchilla)
            .then(createRes => {
                chinchilla = createRes.body;
                return request(app).get('/rodents'); 
            })
            .then(getRes => {
                expect(getRes.body).toEqual([deerMouse, chinchilla]);
            });
    });

});
