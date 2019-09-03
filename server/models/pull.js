module.exports = (sequelize, type) => {
  return sequelize.define("pull", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    betAmount: {
      type: type.INTEGER,
      allowNull: false
    },
    payout: {
      type: type.INTEGER,
      allowNull: false
    },
    userId: {
      type: type.INTEGER,
      allowNull: false
    }
  });
};
