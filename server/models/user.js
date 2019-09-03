module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING,
      allowNull: false
    },
    uniqueIdentifier: {
      type: type.STRING,
      allowNull: false
    },
    identifierType: {
      type: type.ENUM("login", "cookie"),
      allowNull: false
    }
  });
};
