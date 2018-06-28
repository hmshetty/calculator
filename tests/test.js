var app = require('../app')
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe("Calculator Unit Tests", () => {
    it("should add properly in a happy case", (done)=>{
        chai.request(app)
            .get('/add?first=10&second=20')
            .end((err, res)=>{
                if (err) done(err);
                else{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql(30);
                    done();
                }
                
            });
    });

    it("should subtract properly in a happy case", (done)=>{
        chai.request(app)
            .get('/sub?first=30&second=20')
            .end((err, res)=>{
                if (err) done(err);
                else{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql(10);
                    done();
                }
            });
    });

    it("should multiply properly in a happy case", (done)=>{
        chai.request(app)
            .get('/mul?first=30&second=20')
            .end((err, res)=>{
                if (err) done(err);
                else{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql(600);
                    done();
                }
            });
    });

    it("should divide properly in a happy case", (done)=>{
        chai.request(app)
            .get('/div?first=40&second=20')
            .end((err, res)=>{
                if (err) done(err);
                else{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql(2);
                    done();
                }
            });
    });

    it("should check for missing parameter - first", (done)=>{
        chai.request(app)
            .get('/add?second=20')
            .end((err, res)=>{
                if (err) done(err);
                else{
                    res.should.have.status(400);
                    res.text.should.eql("Missing required parameter 'first'")
                    done();
                }
            });
    });


})