'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");



module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  // User.beforeCreate((user, options) => {
  //
  //   return bcrypt.hash(user.password, 10)
  //       .then(hash => {
  //         user.password = hash;
  //       })
  //       .catch(err => {
  //         throw new Error();
  //       });
  // });
  return User;
};