const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('file', {
    file_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    file_uri: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    file_connect_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'file',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "file_code" },
        ]
      },
    ]
  });
};
