const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat_comment', {
    chat_comment_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    chat_comment_create_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    chat_comment_update_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    chat_comment_contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Chat_chat_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'chat',
        key: 'chat_code'
      }
    },
    User_us_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'user',
        key: 'us_code'
      }
    }
  }, {
    sequelize,
    tableName: 'chat_comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_comment_code" },
        ]
      },
      {
        name: "fk_Chat_Comment_Chat1_idx",
        using: "BTREE",
        fields: [
          { name: "Chat_chat_code" },
        ]
      },
      {
        name: "fk_Chat_Comment_User1_idx",
        using: "BTREE",
        fields: [
          { name: "User_us_code" },
        ]
      },
    ]
  });
};
