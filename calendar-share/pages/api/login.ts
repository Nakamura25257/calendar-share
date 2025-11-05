import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";
import bcrypt from 'bcrypt';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const {email, password} = req.body;

  if(req.method === 'POST') {
    // postgreにアクセス
    const result = await pool.query(
      'select id, email, password from users where email = $1',
      [email]
    );
    if(result.rows.length === 0) {
      console.error('No user');
      return res.status(401).json({message: '該当のユーザーは見つかりませんでした'});
    } else {
      // パスワードの照合
      const compared: boolean = await bcrypt.compare(password, result.rows[0].password);
      if(!compared) {
        console.error('password mismatch');
        return res.status(401).json({message: 'パスワードが一致しません'});
      }
      else {
        console.log('logged in successfully');
        return res.status(200).json({message: 'ログインに成功しました'});
      }
    }
  }
}