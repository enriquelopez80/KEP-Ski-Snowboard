module.exports = function(sequelize, DataTypes) {
  var Merch = sequelize.define("Merch", {
    department: {
      type: DataTypes.STRING
    },
    class: {
      type: DataTypes.STRING
    },
    subclass: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING
    },
    inventoryValue: {
      type: DataTypes.INTEGER
    },
    inventoryUnits: {
      type: DataTypes.INTEGER
    },
    itemPrice: {
      type: DataTypes.INTEGER
    },
    imgSrc: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Merch;
};
