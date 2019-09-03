module.exports = (sequelize, type) => {
  return sequelize.define("stop", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING,
      allowNull: false
    },
    stopType: {
      type: type.STRING
    },
    probability: {
      // 1 out of X probability
      type: type.INTEGER,
      allowNull: false
    }
  });
};
