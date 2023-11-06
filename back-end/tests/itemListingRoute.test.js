const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const axios = require('axios'); 
const { expect } = chai;
const app = require('../app'); 

chai.use(chaiHttp);

describe('Item Listings API', () => {
  
  describe('GET /api/item-listings', () => {
    // This test is for successful fetch
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

    // Describe error handling in the axios call
    describe('when there is an error fetching item listings', () => {
      let axiosGetStub;

      /*NOTE: we are mocking the database with API. 
              when we want to test for errors, the axios.get won't be able to always give us error.
              So we mock the error with sinon.stub()
        */ 
      beforeEach(() => {
        // temporarily change the get function to return an error
        axiosGetStub = sinon.stub(axios, 'get').rejects(new Error('Network Error'));
      });

      afterEach(() => {
        // Restore the axios.get call to its original state
        axiosGetStub.restore();
      });

      it('should handle errors when fetching item listings', (done) => {
        chai.request(app)
          .get('/api/item-listings')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(500);
            expect(res.text).to.equal('An error occurred while fetching item listings.');
            done();
          });
      });
    });
  });
});
