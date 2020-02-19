const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../src/app');
const movies = require('../src/movies-data-small.json');

describe('App module', () => {
  describe('GET /movie', () => {
    it('should return 200 and JSON data of movies', () => {
      return supertest(app)
        .get('/movie')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect((res.body).to.be.an('array'));
        });
    });

    it('should return 400 when genre param invalid', () => {
      return supertest(app)
        .get('movie')
        .query({ genre: 'invalid'})
        .expect(400, 'Queried genre invalid');
    });
  });
});