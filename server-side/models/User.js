module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    contact: Sequelize.STRING,
    createdAt: Sequelize.DATE,
  });
  return User;
};

