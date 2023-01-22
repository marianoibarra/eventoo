const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'invalid email'
        },
        isUnique(email, next) {
          User.findOne({where: {email}})
            .then((email) => {
              if (email) {
                throw new Error();
              }
              return next()
            })
            .catch(e => next('email already exist'))
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING
    },
  })
}
