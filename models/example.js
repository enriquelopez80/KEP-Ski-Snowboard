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
    inventory_value: {
      type: DataTypes.INTEGER
    },
    inventory_units: {
      type: DataTypes.INTEGER
    },
    item_price: {
      type: DataTypes.INTEGER
    },
    img_src: {
      type: DataTypes.STRING
    },
  });
  return Merch;
};