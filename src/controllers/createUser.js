const { User, Address } = require("../models");
const bcrypt = require("bcrypt");
const regex = require("../helpers/regexps");

createUser = async (req, res) => {
  try {
    const { email, password, name, last_name, profile_pic, role_id, born } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: "El correo ya esta en uso" });
    }

    const regex =
      /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/gm;

    if (!regex.test(password)) {
      return res.status(400).send({
        message: "La contraseña no cumple con los requisitos de seguridad",
      });
    }

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      last_name,
      profile_pic,
      role_id,
      born,
    });

    let address = await Address.findOne({
      where: { city, state, country, zip_code },
    });
    if (!address) {
      address = await Address.create({ city, state, country, zip_code });
    }

    newUser.addAddress(address);
    await newUser.save();

    res.send("Usuario creado con éxito");
  } catch (err) {
    res.send(err.message);
  }
};
module.exports = createUser;
