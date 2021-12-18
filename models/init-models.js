const DataTypes = require("sequelize").DataTypes;
const _channel = require("./channel");
const _channeluserlist = require("./channeluserlist");
const _chat = require("./chat");
const _chat_comment = require("./chat_comment");
const _dm = require("./dm");
const _dm_comment = require("./dm_comment");
const _emoticon = require("./emoticon");
const _file = require("./file");
const _user = require("./user");
const _workspace = require("./workspace");

const initModels = (sequelize) => {
  const channel = _channel(sequelize, DataTypes);
  const channeluserlist = _channeluserlist(sequelize, DataTypes);
  const chat = _chat(sequelize, DataTypes);
  const chat_comment = _chat_comment(sequelize, DataTypes);
  const dm = _dm(sequelize, DataTypes);
  const dm_comment = _dm_comment(sequelize, DataTypes);
  const emoticon = _emoticon(sequelize, DataTypes);
  const file = _file(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);
  const workspace = _workspace(sequelize, DataTypes);

  channel.belongsToMany(user, { as: 'User_us_code_users', through: channeluserlist, foreignKey: "Channel_ch_code", otherKey: "User_us_code" });
  user.belongsToMany(channel, { as: 'Channel_ch_code_channels', through: channeluserlist, foreignKey: "User_us_code", otherKey: "Channel_ch_code" });
  channeluserlist.belongsTo(channel, { as: "Channel_ch_code_channel", foreignKey: "Channel_ch_code"});
  channel.hasMany(channeluserlist, { as: "channeluserlists", foreignKey: "Channel_ch_code"});
  chat.belongsTo(channel, { as: "chat_ch_code_channel", foreignKey: "chat_ch_code"});
  channel.hasMany(chat, { as: "chats", foreignKey: "chat_ch_code"});
  chat_comment.belongsTo(chat, { as: "Chat_chat_code_chat", foreignKey: "Chat_chat_code"});
  chat.hasMany(chat_comment, { as: "chat_comments", foreignKey: "Chat_chat_code"});
  dm_comment.belongsTo(dm, { as: "DM_dm_code_dm", foreignKey: "DM_dm_code"});
  dm.hasMany(dm_comment, { as: "dm_comments", foreignKey: "DM_dm_code"});
  channeluserlist.belongsTo(user, { as: "User_us_code_user", foreignKey: "User_us_code"});
  user.hasMany(channeluserlist, { as: "channeluserlists", foreignKey: "User_us_code"});
  chat.belongsTo(user, { as: "chat_us_code_user", foreignKey: "chat_us_code"});
  user.hasMany(chat, { as: "chats", foreignKey: "chat_us_code"});
  chat_comment.belongsTo(user, { as: "User_us_code_user", foreignKey: "User_us_code"});
  user.hasMany(chat_comment, { as: "chat_comments", foreignKey: "User_us_code"});
  dm.belongsTo(user, { as: "dm_sender_code_user", foreignKey: "dm_sender_code"});
  user.hasMany(dm, { as: "dms", foreignKey: "dm_sender_code"});
  dm_comment.belongsTo(user, { as: "User_us_code_user", foreignKey: "User_us_code"});
  user.hasMany(dm_comment, { as: "dm_comments", foreignKey: "User_us_code"});
  channel.belongsTo(workspace, { as: "ch_workspace_workspace", foreignKey: "ch_workspace"});
  workspace.hasMany(channel, { as: "channels", foreignKey: "ch_workspace"});
  user.belongsTo(workspace, { as: "us_workspace_workspace", foreignKey: "us_workspace"});
  workspace.hasMany(user, { as: "users", foreignKey: "us_workspace"});

  return {
    channel,
    channeluserlist,
    chat,
    chat_comment,
    dm,
    dm_comment,
    emoticon,
    file,
    user,
    workspace,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
