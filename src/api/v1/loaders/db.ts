import config from "../../../config";
import { createConnection } from "typeorm";
import { User } from "../models";
import { TechDoc } from "../models";

export default async (): Promise<any> => {


  try {
    await createConnection({
      type: "postgres",
      host: config.postgres.host,
      port: parseInt(config.postgres.port),
      username: config.postgres.username,
      password: config.postgres.password,
      entities: [User, TechDoc],
      synchronize: true,
      database: config.postgres.database,
    });
    console.log(" \n 💪  Postgresql is connected...")
  } catch (e) {
    console.log("Error while database is trying to connect;")
    console.log(e);
  }
};
