const expect = require("chai").expect

// Use this agent for authenticated requests
let authAgent = require("./authAgent")

describe("GET /profile", () => {

  it("获取用户profile的所有value", done => {
    authAgent
      .get("/profile")
      .expect("Content-Type", /json/)
      .expect(res => {
        expect(res.body).to.be.an("object")  
      })
      .expect(200, done)
  })

})