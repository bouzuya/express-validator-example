var supertest = require('supertest');
var server = require('../lib/server');

describe('GET /', function() {
  it('should return 200', function(done) {
    supertest(server)
    .get('/')
    .expect(200)
    .expect('Hello', done);
  }); 
});

describe('POST /users/create', function() {

  describe('send name: "bouzuya"', function() {
    it('should return "name" value', function(done) {
      supertest(server)
      .post('/users/create')
      .send({ name: 'bouzuya', birthday: '1980/01/01' })
      .expect(200)
      .expect('bouzuya', done);
    });
  });

  describe('send name: " "', function() {
    it('should return error message', function(done) {
      supertest(server)
      .post('/users/create')
      .send({ name: ' ', birthday: '1980/01/01' })
      .expect(200)
      .expect('name can\'t be empty.', done);
    });
  });

  describe('send birthday: "20xx/01/01"', function() {
    it('should return error message', function(done) {
      supertest(server)
      .post('/users/create')
      .send({ name: 'bouzuya', birthday: '20xx/01/01' })
      .expect(200)
      .expect('birthday is not date.', done);
    });
  });

});

