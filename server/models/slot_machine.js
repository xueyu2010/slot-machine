module.exports = (sequelize, type) => {
  return sequelize.define("slot_machine", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING,
      allowNull: false
    },
    reelIds: {
      type: type.STRING,
      get() {
        return this.getDataValue("reelIds").split(";");
      },
      set(val) {
        this.setDataValue("reelIds", val.join(";"));
      }
    },
    payout: {
      type: type.JSON,
      allowNull: false
    },
    status: {
      type: type.ENUM("active", "inactive"),
      allowNull: false
    }
  });
};
