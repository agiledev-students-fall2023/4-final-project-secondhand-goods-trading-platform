const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../app'); // Adjust the path according to your project structure

chai.use(chaiHttp);

describe('User Account Information', () => {

  describe('GET /api/account', () => {
    it('it should retrieve the user account information for an existing user', (done) => {
      chai.request(server)
        .get('/api/account')
        .query({ username: 'user1' }) // Assuming you use a query for the username
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.user).to.deep.include({
            username: 'user1',
            // Add more fields you expect to be in the user data
            // e.g., email, phone, address, etc., depending on your user model
            email: 'user1@example.com', 
            password: 'pass1',
            phone: '(+1)123-456-7890',
            addressLine1: '872C Apple Hall',
            addressLine2: 'New York NY1234',
            payment: '1234',
          });
          done();
        });
    });

    it('it should return an error for a non-existent user', (done) => {
      chai.request(server)
        .get('/api/account')
        .query({ username: 'nonexistentUser' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

  });
});
