const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('channel', {
    ch_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    ch_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ch_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ch_writer: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ch_create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    ch_workspace: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'workspace',
        key: 'ws_code'
      }
    }
  }, {
    sequelize,
    tableName: 'channel',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ch_code" },
        ]
      },
      {
        name: "fk_Channel_WorkSpace1_idx",
        using: "BTREE",
        fields: [
          { name: "ch_workspace" },
        ]
      },
    ]
  });
};
