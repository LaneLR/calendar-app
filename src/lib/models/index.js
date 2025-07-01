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
      allowNull: true,
    },
  }, { sequelize, modelName: "Event" });

  // associations
  User.belongsToMany(User, {
  as: "Contacts",
  through: "UserContacts",
  foreignKey: "UserId",  // who is doing the adding
  otherKey: "ContactId",   // who is being added
});
  // User.belongsToMany(User)

  User.belongsToMany(Event, { through: "UserEvents" });
  Event.belongsToMany(User, { through: "UserEvents" }); 

  return {
    sequelize,
    User,
    Event,
  };
}

export default initializeModels;
