require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const Rodents = require('../lib/models/Rodents');
const Whales = require('../lib/models/Whales');

describe('rodent manager', () => {
    
    const rodents = [
        { species: 'Nelson\'s Woodrat', status: 'Threatened' },
        { species: 'Bavarian Pine Vole', status: 'Threatened' },
        { species: 'Kashmir Flying Squirrel', status: 'Least Concern' }
    ];

    let createdRodents;

    const creator = rodent => {
        return request(app).post('/rodents')
            .send(rodent);
    };
    
    beforeEach(() => {
        Rodents.drop();
    });

    beforeEach(() => {
        return Promise.all(rodents.map(creator))
            .then(rs => {
                createdRodents = rs.map(r => r.body);
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
        return request(app).get('/rodents')
            .then(res => {
                expect(res.body).toEqual(createdRodents);
            });            
    });

    it('APP updates a rodent by id', () => {
        return request(app).put(`/rodents/${createdRodents[2]._id}`)
            .send({ status: 'Vulnerable' })
            .then(res => {
                console.log(res.body);
                expect(res.body).toEqual({ ...createdRodents[2], status: 'Vulnerable' });
            });
    });

    it('APP deletes a rodent by id', () => {
        return request(app).delete(`/rodents/${createdRodents[0]._id}`)
            .then(res => {
                expect(res.body).toEqual({ removed: true });
            });
    });

});

describe('whale manager', () => {
    const whales = [
        { species: 'Bryde\'s Whale', status: 'Data Deficient' },
        { species: 'Sei Whale', status: 'Threatened' },
        { species: 'Southern Right Whale', status: 'Least Concern' }
    ];

    let createdWhales;

    const creator = whale => {
        return request(app).post('/whales')
            .send(whale);
    };
    
    beforeEach(() => {
        Whales.drop();
    });

    beforeEach(() => {
        return Promise.all(whales.map(creator))
            .then(rs => {
                createdWhales = rs.map(r => r.body);
            });
    });

    it('APP creates a whale', () => {
        return request(app).post('/whales')
            .send({ species: 'Cuvier\'s Beaked Whale', status: 'Least Concern' })
            .then(res => {
                const json = res.body;
                expect(json.species).toEqual('Cuvier\'s Beaked Whale');
                expect(json.status).toEqual('Least Concern');
                expect(json._id).toEqual(expect.any(String));
            });
    });

    
    it('APP gets a whale by its id', () => {
        return request(app).post('/whales')
            .send({ species: 'Irawaddy Dolphin', status: 'Threatened' })
            .then(createRes => {
                const { _id } = createRes.body;
                return request(app).get(`/whales/${_id}`);
            })
            .then(getRes => {
                const whale = getRes.body;
                expect(whale._id).toEqual(expect.any(String));
            });
    });

    it('APP gets all whales in an array', () => {
        return request(app).get('/whales')
            .then(res => {
                expect(res.body).toEqual(createdWhales);
            });            
    });

    it('APP updates a rodent by id', () => {
        return request(app).put(`/whales/${createdWhales[2]._id}`)
            .send({ status: 'Vulnerable' })
            .then(res => {
                expect(res.body).toEqual({ ...createdWhales[2], status: 'Vulnerable' });
            });
    });

    it('APP deletes a whale by id', () => {
        return request(app).delete(`/whales/${createdWhales[0]._id}`)
            .then(res => {
                expect(res.body).toEqual({ removed: true });
            });
    });
});
