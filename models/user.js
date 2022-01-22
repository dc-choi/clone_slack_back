const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    us_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    us_email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    us_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    us_password: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    us_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    us_phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    us_date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('now()'),
      allowNull: false
    },
    us_img: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    us_admin: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false
    },
    us_workspace: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'workspace',
        key: 'ws_code'
      }
    },
    us_sns_id: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    us_ws_invite: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "us_code" },
        ]
      },
      {
        name: "fk_User_WorkSpace_idx",
        using: "BTREE",
        fields: [
          { name: "us_workspace" },
        ]
      },
    ]
  });
};
