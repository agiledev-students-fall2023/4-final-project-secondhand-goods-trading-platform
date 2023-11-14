const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../app'); // Adjust the path according to your project structure

chai.use(chaiHttp);

describe('User Profile', () => {

  describe('PUT /api/edit-profile', () => {
    it('it should update the user profile with valid data', (done) => {
      chai.request(server)
        .put('/api/edit-profile')
        .query({ username: 'user1' }) // Assuming you use a query for the username
        .send({
            email: 'user1@example.com', 
            password: 'pass1',
            phone: '(+1)123-456-7890',
            addressLine1: '872C Apple Hall',
            addressLine2: 'New York NY1234',
            payment: '1234',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Profile information updated');
          // Check if the response includes the updated profile data
          expect(res.body.user).to.deep.include({
            username: 'user1',
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

    it('it should not update for a non-existent user', (done) => {
      chai.request(server)
        .put('/api/edit-profile')
        .query({ username: 'unknownUser' })
        .send({
            emil: 'unknown@example.com', 
            phone: '987654321',
            addressLine1: '404 Error St',
            addressLine2: '',
            payment: '0000'
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('it should handle invalid update requests', (done) => {
      chai.request(server)
        .put('/api/edit-profile')
        .query({ username: 'user1' })
        .send({}) // Sending an empty object to simulate an invalid request
        .end((err, res) => {
          expect(res).to.have.status(400); // Assuming you return a 400 status for bad requests
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Invalid update data');
          done();
        });
    });

  });
});
