const chai = require('chai');
const request = require('supertest');

const app = require('../app');

const ORIGIN = 'http://localhost:3000';

describe('Basic tests for the LiturgiCalendar API', () => {

  it('if the proper origin is set, it should return the API description at the API root', async function () {

    const res = await request(app).get('/api/v1/').set('Origin', ORIGIN).send({});

    chai.expect(res.status).to.be.eql(200);
    chai.expect(res.body).to.have.property('msg');
    chai.expect(res.body.msg).to.be.eql('This is version 1.0 of the LiturgiCalendar API');

  });

  it('if the proper origin is not set, it should return an auth error', async function () {

    const res = await request(app).get('/api/v1/').set('Origin', ORIGIN + 'xx').send({});

    chai.expect(res.status).to.be.eql(403);
    chai.expect(res.body).to.have.property('code');
    chai.expect(res.body.code).to.be.eql('CORS_AUTH_FAILED');
    chai.expect(res.body).to.have.property('msg');
    chai.expect(res.body.msg).to.be.eql('Access is restricted');

  });

});

