import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:8000", credentials: true }));
app.use(json());

export const bootServer = (): void => {
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`サーバーが起動しました http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(`サーバー起動時にエラーが発生しました: ${err}`);
  }
};

export default app;
