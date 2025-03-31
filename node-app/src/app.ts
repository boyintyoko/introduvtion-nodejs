import app from "./server";
import { dbConnection } from "./config/db";
import { bootServer } from "./server";
import { session } from "./routes/session";

bootServer();
dbConnection();

app.use("/session", session);
