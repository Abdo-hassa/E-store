const chai = require("chai");
const chaiHttp = require("chai-http");
const config = require("../src/config/config");

require("../server");

const serverUrl = config.baseurl;

chai.should();

chai.use(chaiHttp);

describe("POST /api/v1/users/signup", () => {
  it("it should signup a user", (done) => {
    let user = {
      firstName: "Abdlallah",
      lastName: "Hassan",
      email: "abdo45010@gmail.com",
      password: "AbdoHassan",
    };

    chai
      .request(serverUrl)
      .post("api/v1/users/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);

        res.body.should.have.property("token");

        res.body.should.be.a("object");

        res.body.token.should.be.a("string");

        done();
      });
  });

  it("it should return validation error in  signup a user", (done) => {
    let user = {
      firstName: "Abdlallah",
      lastName: "Hassan",
      email: "abdo45010@gmail.com",
      password: "AbdoHassan",
    };

    chai
      .request(serverUrl)
      .post("api/v1/users/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);

        done();
      });
  });
});

describe("POST /api/v1/users/login", () => {
  it("it should login a user", async () => {
    let user = {
      email: "abdo45010@gmail.com",
      password: "AbdoHassan",
    };
    const res = await chai
      .request(serverUrl)
      .post("api/v1/users/login")
      .send(user);
    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("token");
    res.body.token.should.be.a("string");
  });
});
