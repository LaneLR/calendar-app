import getSequelizeInstance from "../sequelize.js";
import User from "./User.js";
import Message from "./Message.js";
import { DataTypes } from "sequelize";

const db = {};

async function initializeModels() {
  const sequelize = await getSequelizeInstance();

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Username is required" },
          len: {
            args: [3, 25],
            msg: "Username must be between 3 and 25 characters",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          len: {
            args: [6, 100],
            msg: "Password must be at least 6 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
      },
    }
  );

  Message.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sentAtTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    { sequelize, modelName: "Message" }
  );

  // associations
  User.belongsToMany(User, { as: "Contacts", through: "UserContacts" });

  User.hasMany(Message, { foreignKey: "senderUserId", as: "SentMessages" });
  User.hasMany(Message, {
    foreignKey: "recipientUserId",
    as: "ReceivedMessages",
  });
  Message.belongsTo(User, { foreignKey: "senderUserId", as: "Sender" });
  Message.belongsTo(User, { foreignKey: "recipientUserId", as: "Recipient" });

  db.sequelize = sequelize;
  db.User = User;
  db.Message = Message;

  return db;
}

export default initializeModels;
