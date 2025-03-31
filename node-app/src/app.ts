import app from "./server";
import { dbConnection } from "./config/db";
import { bootServer } from "./server";
import root from "./routes/root";

bootServer();
dbConnection();

app.use("/root", root);
