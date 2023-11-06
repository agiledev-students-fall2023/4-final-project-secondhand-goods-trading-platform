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
  
      it('it should not log in with incorrect password', (done) => {
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
            expect(res.body.message).to.equal('Invalid password');
            done();
          });
      });
      
      it('it should not log in with non-existent user', (done) => {
        chai.request(server)
          .post('/api/login')
          .send({
            username: 'nonexistentuser',
            email: 'nonexistent@example.com',  
            password: 'pass123'
          })
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('User not found');
            done();
          });
      });
      
  
    });
    
    describe('/POST signup', () => {
        it('it should register a new user', (done) => {
          chai.request(server)
            .post('/api/signup')
            .send({
              username: 'newuser',
              email: 'newuser@example.com', 
              password: 'newpass'
            })
            .end((err, res) => {
              expect(res).to.have.status(201);
              expect(res.body).to.be.an('object');
              expect(res.body.message).to.equal('Thank you for signing up!');
              done();
            });
        });
    
        it('it should not register a user with an existing email or username', (done) => {
          chai.request(server)
            .post('/api/signup')
            .send({
              username: 'user1',
              email: 'user1@example.com', 
              password: 'pass1'
            })
            .end((err, res) => {
              expect(res).to.have.status(400);
              expect(res.body).to.be.an('object');
              expect(res.body.message).to.equal('User already exists');
              done();
            });
        });
    
      });
  });
  