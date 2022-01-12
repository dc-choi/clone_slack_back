const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dm_comment', {
    dm_comment_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    dm_comment_create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    dm_comment_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW
    },
    dm_comment_contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DM_dm_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'dm',
        key: 'dm_code'
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
    tableName: 'dm_comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dm_comment_code" },
        ]
      },
      {
        name: "fk_DM_Comment_DM1_idx",
        using: "BTREE",
        fields: [
          { name: "DM_dm_code" },
        ]
      },
      {
        name: "fk_DM_Comment_User1_idx",
        using: "BTREE",
        fields: [
          { name: "User_us_code" },
        ]
      },
    ]
  });
};
