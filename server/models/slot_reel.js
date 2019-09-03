module.exports = (sequelize, type) => {
  return sequelize.define("slot_reel", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stopIds: {
      type: type.STRING,
      get() {
        return this.getDataValue("stopIds").split(";");
      },
      set(val) {
        this.setDataValue("stopIds", val.join(";"));
      }
    },
    name: {
      type: type.STRING,
      allowNull: false
    }
  });
};
