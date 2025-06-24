import initializeModels from "./models";
import getSequelizeInstance from "./sequelize";

if (!global.db) {
  global.db = {};
}

export default async function initializeDbAndModels() {
  if (!global.db.sequelize || !global.db.User || !global.db.Message) {
    try {
      console.log(
        "Attempting to initialize models..."
      );
      const db = await initializeModels();
      global.db = db
      console.log("Models successfully initialized");
    } catch (err) {
      console.error(err);
    }
  }
  return global.db;
}
