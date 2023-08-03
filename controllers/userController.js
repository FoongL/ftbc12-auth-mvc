const BaseController = require("./baseController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController extends BaseController {
  constructor({ users, db }) {
    super(users);
    this.users = users;
  }

  userTest(req, res) {
    return res.json({ success: true, msg: "i am in the user controller" });
  }

  signUp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "missing information" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.model.create({
        email,
        password: hashedPassword,
      });

      const payload = {
        id: newUser.id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

      return res.status(200).json({ success: true, token });
    } catch (err) {
      return res.status(400).json({ success: false, err });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "missing information" });
    }

    try {
      const user = await this.model.findOne({ where: { email } });

      if (!user) {
        // user does not exist
        return res.status(404).json({ success: false, msg: "user not found" });
      }

      const compare = await bcrypt.compare(password, user.password);

      if (!compare) {
        return res
          .status(400)
          .json({ success: false, msg: "wrong password buddy... try again" });
      }

      const payload = {
        id: user.id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

      return res.status(200).json({ success: true, token });
    } catch (err) {
      return res.status(400).json({ success: false, err });
    }
  };
}

module.exports = UserController;
