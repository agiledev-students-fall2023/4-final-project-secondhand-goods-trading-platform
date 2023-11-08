const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const axios = require('axios');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe('SellerVerProductDetailRoute', () => {
  let axiosGetStub;

  before(() => {
    axiosGetStub = sinon.stub(axios, 'get').resolves({
      data: {
        id: 1,
        author: 'John Doe',
        width: 200,
        height: 300,
        url: 'http://example.com',
        download_url: 'http://example.com/image.jpg'
      }
    });
  });

  after(() => {
    axiosGetStub.restore();
  });

  describe('GET /api/seller-product-detail/:id', () => {
    it('should get product details for the given ID', (done) => {
      chai.request(app)
        .get('/api/seller-product-detail/1') // Assuming '1' is a valid ID
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('status');
          done();
        });
    });
  });

  describe('POST /api/seller-product-detail/:id/status', () => {
    it('should update the status of the product', (done) => {
      const newStatus = 'Sold';
      chai.request(app)
        .post('/api/seller-product-detail/1/status')
        .send({ status: newStatus })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({ id: '1', status: newStatus });
          done();
        });
    });
  });

  describe('error handling for GET /api/seller-product-detail/:id', () => {
    before(() => {
      // Force axios.get to reject for this test suite
      axiosGetStub.rejects(new Error('Network Error'));
    });

    it('should handle errors during product detail fetch', (done) => {
      chai.request(app)
        .get('/api/seller-product-detail/1')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.text).to.equal('An error occurred while fetching seller product details.');
          done();
        });
    });
  });
});

// Path: back-end/tests/sellerVerProductDetailRoute.test.js