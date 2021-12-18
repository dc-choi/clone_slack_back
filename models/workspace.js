const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workspace', {
    ws_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    ws_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ws_img: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'workspace',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ws_code" },
        ]
      },
    ]
  });
};
