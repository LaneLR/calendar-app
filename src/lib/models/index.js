import getSequelizeInstance from "../sequelize.js";
import User from "./User.js";
import Message from "./Message.js";
import Event from "./Event.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

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

  Event.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { sequelize, modelName: "Event" });

  // associations
  User.belongsToMany(User, {
  as: "Contacts",
  through: "UserContacts",
  foreignKey: "UserId",  // who is doing the adding
  otherKey: "ContactId",   // who is being added
});

  User.hasMany(Message, { foreignKey: "senderUserId", as: "SentMessages" });
  User.hasMany(Message, { foreignKey: "recipientUserId", as: "ReceivedMessages" });

  Message.belongsTo(User, { foreignKey: "senderUserId", as: "Sender" });
  Message.belongsTo(User, { foreignKey: "recipientUserId", as: "Recipient" });

  User.hasMany(Event, { foreignKey: "userId" });
  Event.belongsTo(User, { foreignKey: "userId" });

  return {
    sequelize,
    User,
    Message,
    Event,
  };
}

export default initializeModels;
