const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const axios = require('axios'); 
const { expect } = chai;
const app = require('../app'); 

chai.use(chaiHttp);

describe('My Selling Items API', () => {
  
  describe('GET /api/my-selling-items', () => {
    // everything is correct
    it('should get all selling items', (done) => {
      chai.request(app)
        .get('/api/my-selling-items')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    // Describe error handling in the axios call
    describe('when there is an error fetching selling items', () => {
      let axiosGetStub;
      beforeEach(() => {
        // temporarily change the get function to return an error
        axiosGetStub = sinon.stub(axios, 'get').rejects(new Error('Network Error'));
      });

      afterEach(() => {
        // Restore the axios.get call to its original state
        axiosGetStub.restore();
      });

      it('should handle errors when fetching selling items', (done) => {
        chai.request(app)
          .get('/api/my-selling-items')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(500);
            expect(res.text).to.equal('An error occurred while fetching my selling items.');
            done();
          });
      });
    });
  });
});
