import getSequelizeInstance from "./sequelize";
import initializeModels from "@/lib/models";

export default async function initializeDbAndModels() {
  if (!global.db?.sequelize) {
    try {
      console.log("Initializing Sequelize and models...");

      const sequelize = await getSequelizeInstance();

      const db = await initializeModels(sequelize);

      await sequelize.sync({ alter: true });

      global.db = db;

      console.log("DB and models initialized");
    } catch (err) {
      console.error("Error initializing DB and models:", err);
      return null;
    }
  }

  return global.db;
}
