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
            username: 'honey',
            email: 'honey@example.com', 
            password: 'Honey1234@@'
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Login successful');
            expect(res.body.username).to.equal('honey');
            expect(res.body.email).to.equal('honey@example.com');
            done();
          });
      });
      

      it('it should not log in with incorrect password', (done) => {
        chai.request(server)
          .post('/api/login')
          .send({
            username: 'honey',
            email: 'honey@example.com',  
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
            password: 'Pass123@@'
          })
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('User not found');
            done();
          });
      });
      
  
    });

    const User = require('../models/User')
    
    describe('/POST signup', () => {
      it('it should register a new user', async () => { // use async here
        const testUserData = {
          username: 'user4test',
          email: 'user4test@example.com', 
          password: 'Pass123@@'
        };
    
        const res = await chai.request(server)
          .post('/api/signup')
          .send(testUserData);
    
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Thank you for signing up!');
    
        // Cleanup: delete the test user
        try {
          await User.deleteOne({ email: testUserData.email });
        } catch (deleteErr) {
          throw new Error('Error cleaning up test user: ' + deleteErr);
        }
      });
  
    
        it('it should not register a user with an existing email or username', (done) => {
          chai.request(server)
            .post('/api/signup')
            .send({
              username: 'honey',
              email: 'honey@example.com', 
              password: 'Honey1234@@'
            })
            .end((err, res) => {
              expect(res).to.have.status(400);
              expect(res.body).to.be.an('object');
              expect(res.body.message).to.equal('User already exists');
              done();
            });
        });

        it('it should not register a user with invalid data', (done) => {
          chai.request(server)
            .post('/api/signup')
            .send({
              username: 'us', // too short
              email: 'notanemail', // invalid email
              password: '123' // weak password
            })
            .end((err, res) => {
              expect(res).to.have.status(400);
              expect(res.body).to.be.an('object');
              expect(res.body.message).to.equal('Validation errors');
              expect(res.body.errors).to.be.an('array');
              done();
            });
        });

        
       
    
      });
  });
  