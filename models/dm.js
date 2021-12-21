const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dm', {
    dm_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    dm_contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dm_create_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dm_update_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dm_sender_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'user',
        key: 'us_code'
      }
    },
    dm_receiver_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'dm',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dm_code" },
        ]
      },
      {
        name: "fk_DM_User1_idx",
        using: "BTREE",
        fields: [
          { name: "dm_sender_code" },
        ]
      },
    ]
  });
};
