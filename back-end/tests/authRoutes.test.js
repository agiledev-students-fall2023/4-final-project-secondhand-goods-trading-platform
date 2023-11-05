const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../app'); 

chai.use(chaiHttp);

describe('Authentication', () => {
    describe('/POST login', () => {
      it('it should log in with correct credentials', (done) => {
        chai.request(server)
          .post('/api/login')
          .send({
            username: 'user1',
            email: 'user1@example.com', 
            password: 'pass1'
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Login successful');
            expect(res.body.user).to.deep.include({
              username: 'user1',
              email: 'user1@example.com'  
            });
            done();
          });
      });
  
      it('it should not log in with incorrect credentials', (done) => {
        chai.request(server)
          .post('/api/login')
          .send({
            username: 'user1',
            email: 'user1@example.com',  
            password: 'wrongpassword'
          })
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Login failed');
            done();
          });
      });
  
    });
  });
  