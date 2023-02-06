const { User, Address, RoleAdmin } = require("../db");

const createSuperAdmin = async (data) => {
  const {
    email,
    password,
    name,
    last_name,
    profile_pic,
    born,
    address_line,
    city,
    state,
    country,
    zip_code,
  } = data;

  const adminFromDB = await User.findOne({ where: { email } });

  if (!adminFromDB) {
    const user = await User.create({
      email,
      password,
      name,
      last_name,
      profile_pic,
      born,
      //   address: {
      //     address_line,
      //     city,
      //     state,
      //     country,
      //     zip_code,
      //   },
      //   RoleAdmin: {name: 'SUPERADMIN'},
    });
    const address = await Address.create({
      address_line,
      city,
      state,
      country,
      zip_code,
    });
    user.setAddress(address);

    const role = await RoleAdmin.create({ name: "SUPERADMIN" });
    user.setRoleAdmin(role);
  }
};

module.exports = {
  createSuperAdmin,
};
