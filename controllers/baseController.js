class BaseController {
  constructor(model) {
    this.model = model
  }

  test(req, res) {
    return res.json({ success: true, msg: "I am shared between all the different controllers" });
  }

  // build out more methods

  helloWorld(req, res) {
    const { query, q2 } = req.query;
    console.log(query);
    return res.send("Hello, World!");
  }

  bodyTest(req, res) {
    const { name, company } = req.body;
    console.log({ name, company });
    return res.json({ success: true, name, company });
  }
}

module.exports = BaseController;
