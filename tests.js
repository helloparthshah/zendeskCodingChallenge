var chai = require('chai'),
    chaiHttp = require('chai-http');

let app = require('./app');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('zendeskCodingChallenge', function () {

    describe('testing invalid path', () => {
        it('it should throw error', (done) => {
            chai.request(app)
                .get('/asdasd')
                .end((err, res) => {
                    expect(res.notFound).to.be.true;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    describe('testing /', () => {
        it('it should throw error', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('testing tickets no query', () => {
        it('it should throw error', (done) => {
            chai.request(app)
                .get('/tickets')
                .end((err, res) => {
                    expect(res.badRequest).to.be.true;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('testing tickets with 25 per_page', () => {
        it('it should GET 25 tickets', (done) => {
            chai.request(app)
                .get('/tickets')
                .query({
                    page: '1',
                    per_page: '25'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.tickets.length).to.be.eql(25);
                    expect(res.body.previous_page).to.be.null;
                    done();
                });
        });
    });

    describe('testing tickets with 50 per_page', () => {
        it('it should GET 50 tickets', (done) => {
            chai.request(app)
                .get('/tickets')
                .query({
                    page: '1',
                    per_page: '50'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.tickets.length).to.be.eql(50);
                    expect(res.body.previous_page).to.be.null;
                    done();
                });
        });
    });

    describe('testing page 2', () => {
        it('it should GET second page', (done) => {
            chai.request(app)
                .get('/tickets')
                .query({
                    page: '2',
                    per_page: '25'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.tickets.length).to.be.eql(25);
                    expect(res.body.previous_page).to.not.be.null;
                    done();
                });
        });
    });
});