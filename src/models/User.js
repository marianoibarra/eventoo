const { DataTypes } = require('sequelize');
const regexp_password = require('../helpers/regexps');

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
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull:true,
        },
        last_name: {
            type: DataTypes.STRING(30),
            allowNull:true,
        },
        profile_pic: {
            type: DataTypes.STRING,
            allowNull:true,
            validate: {
              isURL: {
                args: true,
                msg: 'URL invalid'
              }
            }
        },
        born: {
            type:DataTypes.DATEONLY,
            allowNull:true,
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            allowNull:true,
        },
        emailIsVerify: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        registerIsCompleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
      
    })
};