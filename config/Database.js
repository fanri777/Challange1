import { Sequelize } from "sequelize";

const db = new Sequelize('challenge1','postgres','1234567', {
     host: "localhost",
     dialect: "postgres"
});

export default db;