const chai = require('chai');
const request = require('supertest');

const app = require('../app');

const ORIGIN = 'http://localhost:3000';

describe('Basic tests for the LiturgiCalendar API', () => {

  it('should return the API description at the API root if the proper origin is set', async function () {

    const res = await request(app).get('/api/v1/').set('Origin', ORIGIN).send({});

    chai.expect(res.status).to.be.eql(200);
    chai.expect(res.body).to.have.property('msg');
    chai.expect(res.body.msg).to.be.eql('This is version 1.0 of the LiturgiCalendar API');

  });

  it('should return an auth error if the proper origin is not set', async function () {

    const res = await request(app).get('/api/v1/').set('Origin', ORIGIN + 'xx').send({});

    chai.expect(res.status).to.be.eql(403);
    chai.expect(res.body).to.have.property('code');
    chai.expect(res.body.code).to.be.eql('CORS_AUTH_FAILED');
    chai.expect(res.body).to.have.property('msg');
    chai.expect(res.body.msg).to.be.eql('Access is restricted');

  });

  it('should have access to its config variables', async function () {

    app.use('/api/fake-endpoint', function(req, res) {
      res.status(200).json({ code: 'SUCCESS', msg: 'This route does nothing', data: {
        calc: {
          url: app.setting('support').getContext('config').get('lc.calcRequestUrl'),
          region: app.setting('support').getContext('config').get('lc.sqs.region'),
        }
      }});
    });

    const res = await request(app).get('/api/v1/').set('Origin', ORIGIN).send({});

    chai.expect(res.status).to.be.eql(200);
    chai.expect(res.body).to.have.property('msg');
    chai.expect(res.body.msg).to.be.eql('This is version 1.0 of the LiturgiCalendar API');

  });

  // TODO -- we can set these up once I've got a database and my calc scripts are running again
  it('should return a waiting message when data needs to be calculated');
  it('should return the requested data when ready');

});

