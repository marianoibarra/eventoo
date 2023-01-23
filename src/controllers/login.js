const { User } = require("../models");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    // const match = await bcrypt.compare(password, user.password);
    // if (!match) {
    //     return res.status(401).send({ message: "Email or password is incorrect" });
    // }  ESTA MANEJADO EN LA DB

    const match = await user.comparePassword(password);

    if (!match) {
        return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1d"
    });

    return res.send({ message: "Logged in successfully", token });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = login;