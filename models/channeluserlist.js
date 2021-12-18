const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('channeluserlist', {
    User_us_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'us_code'
      }
    },
    Channel_ch_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'channel',
        key: 'ch_code'
      }
    }
  }, {
    sequelize,
    tableName: 'channeluserlist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "User_us_code" },
          { name: "Channel_ch_code" },
        ]
      },
      {
        name: "fk_ChannelUserList_User1_idx",
        using: "BTREE",
        fields: [
          { name: "User_us_code" },
        ]
      },
      {
        name: "fk_ChannelUserList_Channel1_idx",
        using: "BTREE",
        fields: [
          { name: "Channel_ch_code" },
        ]
      },
    ]
  });
};
