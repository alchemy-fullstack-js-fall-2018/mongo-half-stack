require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');

const Noodles = require('../lib/models/Noodle');
const Sushis = require('../lib/models/Sushi');

describe('noodles and sushi', () => {

    describe('noodle name and locations', () => {

        const noodleInfo = [
            { name: 'Pho4me', location: 'hillsboro' },
            { name: 'photastic', location: 'beaverton' }
        ];
    
        let createdNoodleHouse;
    
        const creator = noodlePlace => {
            return request(app).post('/noodles')
                .send(noodlePlace);
        };
    
        beforeEach(() => {
            return Noodles.drop();
        });
    
        beforeEach(() => {
            return Promise.all(noodleInfo.map(creator))
                .then(ts => {
                    createdNoodleHouse = ts.map(t => t.body);
                });
        });
    
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
        
        it('gets a noodle location by id', () => {
            return request(app).get(`/noodles/${createdNoodleHouse[0]._id}`)
                .then(res => {
                    expect(res.body).toEqual(createdNoodleHouse[0]);
                });
        });
    
        it('gets all noodle locations ', () => {
            return request(app).get('/noodles/').set('Accept', 'application/json')
                .then(res => {
                    expect(res.body).toEqual(createdNoodleHouse);
                });
        });
    
        it('updates a location name', () => {
            return request(app).put(`/noodles/${createdNoodleHouse[0]._id}`)
                .send({ name: 'Pho Glory' })
                .then(res => {
                    expect(res.body).toEqual({ ...createdNoodleHouse[0], name: 'Pho Glory' });
                });
        });       
    
        it('deletes a noodle location', () => {
            return request(app).delete(`/noodles/${createdNoodleHouse[0]._id}`)
                .then(res => {
                    expect(res.body).toEqual({ removed: true });
                });    
        });

        it('returns 404 when there is no method', () => {
            return request(app)
                .patch('/error')
                .send({})
                .then(res => {
                    expect(res.statusCode).toEqual(404);
                });
        });
    
        it('returns 404 when there is no route or a bad route', () => {
            return request(app).get('/error').then(res => {
                expect(res.statusCode).toEqual(404);
            });
        });
    });

    describe('sushi rolls and their place', () => {

        const sushiInfo = [
            { name: 'texas roll', location: 'texas' },
            { name: 'philly roll', location: 'philadelphia' }
        ];
    
        let createdSushi;
    
        const creator = sushiOrigin => {
            return request(app).post('/sushis')
                .send(sushiOrigin);
        };
    
        beforeEach(() => {
            return Sushis.drop();
        });
    
        beforeEach(() => {
            return Promise.all(sushiInfo.map(creator))
                .then(ts => {
                    createdSushi = ts.map(t => t.body);
                });
        });
    
        it('this creates a sushi roll and its origin', () => {
            return request(app).post('/sushis')
                .send({ name: 'oregon roll', location: 'oregon' })
                .then(res => {
                    expect(res.body).toEqual({
                        _id: expect.any(String),
                        name: 'oregon roll',
                        location: 'oregon'
                    });
                });
        });
        
        it('gets a sushi roll by id', () => {
            return request(app).get(`/sushis/${createdSushi[0]._id}`)
                .then(res => {
                    expect(res.body).toEqual(createdSushi[0]);
                });
        });
    
        it('gets all sushi rolls and origin', () => {
            return request(app).get('/sushis/').set('Accept', 'application/json')
                .then(res => {
                    expect(res.body).toEqual(createdSushi);
                });
        });
    
        it('updates a location name', () => {
            return request(app).put(`/sushis/${createdSushi[0]._id}`)
                .send({ name: 'las vegas' })
                .then(res => {
                    expect(res.body).toEqual({ ...createdSushi[0], name: 'las vegas' });
                });
        });       
    
        it('deletes a sushi location', () => {
            return request(app).delete(`/sushis/${createdSushi[0]._id}`)
                .then(res => {
                    expect(res.body).toEqual({ removed: true });
                });    
        });

        it('returns 404 when there is no method', () => {
            return request(app)
                .patch('/error')
                .send({})
                .then(res => {
                    expect(res.statusCode).toEqual(404);
                });
        });
    
        it('returns 404 when there is no route or a bad route', () => {
            return request(app).get('/error').then(res => {
                expect(res.statusCode).toEqual(404);
            });
        });
    });

});   

