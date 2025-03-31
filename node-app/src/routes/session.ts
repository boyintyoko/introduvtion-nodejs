import { Router, Request, Response } from "express";
import { dbConnection } from "../config/db";
import bcrypt from "bcryptjs";

const router = Router();
const connection = dbConnection();

router.post("/create/account", async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res
      .status(400)
      .json({ message: "ユーザーネームまたはパスワードがありません" });
  }

  try {
    const existingUser = await checkUser(name);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "そのユーザーはすでに存在します" });
    }

    const hashedPassword = await hashPassword(password);

    const query = "INSERT INTO users (name, password) VALUES (?, ?)";
    connection.query(query, [name, hashedPassword], (err, result) => {
      if (err) {
        console.log(`ユーザー作成時にエラーが発生しました: ${err}`);
        return res
          .status(500)
          .json({ message: "ユーザー作成時にエラーが発生しました" });
      }

      return res.status(201).json({
        message: "ユーザーが作成されました",
        user: result,
      });
    });
  } catch (error) {
    console.log("エラーが発生しました", error);
    return res.status(500).json({ message: "エラーが発生しました" });
  }
});

const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch {
    throw new Error("パスワードハッシュ時にエラーが発生しました");
  }
};

const checkUser = async (name: string): Promise<any | null> => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE name = ?";
    connection.query(query, [name], (err, results) => {
      if (err) {
        console.log(`ユーザー確認中にエラーが発生しました: ${err}`);
        reject(err);
      } else {
        resolve(results.length > 0 ? results[0] : null);
      }
    });
  });
};

export { router as session };
