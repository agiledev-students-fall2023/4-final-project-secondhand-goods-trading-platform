const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../app'); // Adjust the path to wherever your app.js is located

chai.use(chaiHttp);

describe('Item Listings API', () => {
  // Test for GET request
  describe('GET /api/item-listings', () => {
    it('should get all item listings', (done) => {
      chai.request(app)
        .get('/api/item-listings')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    let axiosGetStub;

  beforeEach(() => {
    // Replace the actual axios.get function with a stub that throws an error
    axiosGetStub = sinon.stub(axios, 'get').rejects(new Error('Network Error'));
  });

  afterEach(() => {
    // Restore the actual function
    axiosGetStub.restore();
  });

  it('should handle errors when fetching item listings', (done) => {
    chai.request(app)
      .get('/api/item-listings')
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.text).to.equal('An error occurred while fetching item listings.');
        done();
      });
    });
  });
});
