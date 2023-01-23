const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user',{
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
            validate: {
              is: {
                args: /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/gm,
                msg: "This password does not meet the security requirements"
              }
            }
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
      
    })
};