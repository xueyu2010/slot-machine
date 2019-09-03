module.exports = (sequelize, type) => {
  return sequelize.define("wallet", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: type.INTEGER,
      allowNull: false
    },
    balance: {
      type: type.INTEGER,
      allowNull: false
    },
    paid: {
      type: type.INTEGER,
      allowNull: false
    },
    decimal: {
      type: type.INTEGER,
      allowNull: false
    },
    coin: {
      type: type.STRING,
      allowNull: false
    }
  });
};
