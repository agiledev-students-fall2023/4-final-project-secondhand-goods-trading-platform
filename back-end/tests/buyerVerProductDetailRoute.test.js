const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const axios = require('axios');
const app = require('../app'); 
const { expect } = chai;

chai.use(chaiHttp);

describe('BuyerVerProductDetailRoute', () => {
  describe('GET /api/product-detail/:id', () => {
    it('should get product detail for a given id', (done) => {
      chai.request(app)
        .get('/api/product-detail/1') // Use an ID that will return a successful response from Picsum
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    describe('when there is an error fetching product details', () => {
      let axiosGetStub;

      beforeEach(() => {
        axiosGetStub = sinon.stub(axios, 'get').rejects(new Error('Network Error'));
      });

      afterEach(() => {
        axiosGetStub.restore();
      });

      it('should handle errors during product detail fetch', (done) => {
        chai.request(app)
          .get('/api/product-detail/1') // Use an ID that would typically succeed to simulate failure
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(500);
            expect(res.text).to.equal('An error occurred while fetching product details.');
            done();
          });
      });
    });
  });
});

// path: back-end/tests/sellerVerProductDetailRoute.test.js