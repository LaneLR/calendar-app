import { Sequelize } from "sequelize";
import * as pg from "pg";
import "pg-hstore";

let sequelizeInstance;

async function getSequelizeInstance() {
  if (!sequelizeInstance) {
    try {
      if (!pg || Object.keys(pg).length === 0) {
        //check if pg exists and is not empty
        console.error("DEBUG: pg import is empty or failed");
      } else {
        console.log("pg imoport successfully, the keys are: ", Object.keys(pg));
      }

      if (!process.env.DATABASE_URL) {
        console.error(
          "DATABASE_URL is not set in environment variables. Current env:",
          process.env
        );
        throw new Error("Database URL is missing.");
      }

      console.log("Attempting to connect with DATABASE_URL:");

      sequelizeInstance = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        dialectModule: pg,
        logging: false,
        pool: {
          max: 5, //max number of connections in the pool
          min: 0, //min number of connections in the pool
          acquire: 30000, // 30s - max wait time for a connection
          idle: 10000, // 10s - max idle time before a connection is released
        },
      });
      await sequelizeInstance.authenticate();
      console.log("Database connection established successfully");
    } catch (error) {
      console.error(
        "Unable to connect to database or initialize Sequelize:",
        error
      );
      throw error;
    }
  }
  return sequelizeInstance;
}

export default getSequelizeInstance;
