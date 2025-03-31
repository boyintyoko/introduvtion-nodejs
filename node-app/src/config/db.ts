import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

export const dbConnection = (): void => {
  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.log(`MySQLへの接続が失敗しました: ${err}`);
      return;
    }
    console.log("MySQLに接続しました");
  });
};
