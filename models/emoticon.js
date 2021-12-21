const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('emoticon', {
    emoticon_code: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    emoticon_title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    emoticon_uri: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'emoticon',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emoticon_code" },
        ]
      },
    ]
  });
};
