const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const server = require('../app'); // Adjust the path according to your project structure
const expect = chai.expect;

chai.use(chaiHttp);

describe('Add New Items', () => {
    // everything is correct
    it('should upload a file and add a new item', (done) => {
    chai.request(server)
        .post('/api/add-new-item')
        .field('productName', 'Test Product')
        .field('Category', 'Electronics')
        .field('Price', '19.99')
        .field('Description', 'A test product description.')
        .attach('image', fs.readFileSync('./tests/test_image.jpg'), 'test_image.jpg')
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message', 'New product added successfully');
            done();
        });
    });

    // the product name is entered incorrectly
    it('should reject a product with a name longer than 20 characters', (done) => {
    chai.request(server)
        .post('/api/add-new-item')
        .field('productName', 'Product with a very long name that exceeds 20 characters')
        .field('Category', 'Electronics')
        .field('Price', '20.111')
        .field('Description', 'A test product description.')
        .attach('image', fs.readFileSync('./tests/test_image.jpg'), 'test_image.jpg')
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'Please enter a valid name.');
            done();
        });
    });

    it('should reject a product with no category selected', (done) => {
    chai.request(server)
        .post('/api/add-new-item')
        .field('productName', 'Normal Name')
        //no category
        .field('Price', '20.00')
        .field('Description', 'A test product description.')
        .attach('image', fs.readFileSync('./tests/test_image.jpg'), 'test_image.jpg')
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'Please select a category.');
            done();
        });
    });

    it('should reject a product with a negative price', (done) => {
    chai.request(server)
        .post('/api/add-new-item')
        .field('productName', 'Test Product')
        .field('Category', 'Electronics')
        .field('Price', '-20.11')
        .field('Description', 'A test product description.')
        .attach('image', fs.readFileSync('./tests/test_image.jpg'), 'test_image.jpg')
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'Please enter a valid price.');
            done();
        });
    });

    it('should reject a product with no description', (done) => {
    chai.request(server)
        .post('/api/add-new-item')
        .field('productName', 'Test Product')
        .field('Category', 'Electronics')
        .field('Price', '20.111')
        //.field('Description', 'A test product description.')
        .attach('image', fs.readFileSync('./tests/test_image.jpg'), 'test_image.jpg')
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'Description cannot be empty.');
            done();
        });
    });

    it('should reject a product with no picture', (done) => {
    chai.request(server)
        .post('/api/add-new-item')
        .field('productName', 'Test Product')
        .field('Category', 'Electronics')
        .field('Price', '20.111')
        .field('Description', 'A test product description.')
        //.attach('image', fs.readFileSync('./tests/test_image.jpg'), 'test_image.jpg')
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'Please upload a picture.');
            done();
        });
    });

});

const testImagePath = path.join(__dirname, '../uploads', 'test_image.jpg');

// delete the test image from uploads
after((done) => { 
    if (fs.existsSync(testImagePath)) {
        fs.unlink(testImagePath, (err) => {
            if (err) {
                // If there's an error, log it, don't fail the tests
                console.error(`Error deleting test image: ${err.message}`);
            }
            done();
        });
    } else {
        done(); // If the file doesn't exist, just done
    }
});