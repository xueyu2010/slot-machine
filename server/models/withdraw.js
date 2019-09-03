module.exports = (sequelize, type) => {
  return sequelize.define("withdraw", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
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
    },
    status: {
      type: type.ENUM("success", "failed", "pending"),
      allowNull: false
    }
  });
};
