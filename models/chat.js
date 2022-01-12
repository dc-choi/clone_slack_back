const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat', {
    chat_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    chat_create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    chat_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW
    },
    chat_contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    chat_us_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'user',
        key: 'us_code'
      }
    },
    chat_ch_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'channel',
        key: 'ch_code'
      }
    }
  }, {
    sequelize,
    tableName: 'chat',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_code" },
        ]
      },
      {
        name: "fk_Chat_User1_idx",
        using: "BTREE",
        fields: [
          { name: "chat_us_code" },
        ]
      },
      {
        name: "fk_Chat_Channel1_idx",
        using: "BTREE",
        fields: [
          { name: "chat_ch_code" },
        ]
      },
    ]
  });
};
