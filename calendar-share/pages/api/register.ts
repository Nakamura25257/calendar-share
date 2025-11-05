import pool from "../../lib/db";
import {serialize} from 'cookie';
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

type ResponseData = {
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    created_at: Date;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const saltRounds = 10;
  const {name, email, password, confirmPassword} = req.body;
  // postgreにユーザーデータを登録
  if(req.method === 'POST') {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await pool.query(
        'INSERT INTO users (name, email, password, confirm_password) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, hashedPassword, confirmPassword]
      );
      const token: string = 'test cookie';

      // create cookie using serialize func
      // const cookie: string = serialize('token', token, {
      //   httpOnly: true, // jsからCookie情報を取得されないよう設定
      //   // secure: true, // httpsのみ送信 
      //   path: '/', // cookieを送信する対象のurl
      //   maxAge: 60 * 60 * 24 * 7, // 7日間に設定
      //   sameSite: 'lax'
      // });
      
      // res.setHeader('Set-Cookie', cookie); // res.setHeader(name, value);
      if(result.rows.length > 0) {
        return res.status(201).json({message: 'Registered successfully', data: result.rows[0]});
      } else {
        return res.status(500).json({message: 'Failed to register user'});
      }
    } catch(error: unknown) {
      if(error instanceof Error) {
        console.error('error', error);
        return res.status(500).json({message: error.message});
      }
      console.error('unexpected error', error);
      return res.status(500).json({message: 'Unexpected error'});
    }
  }
}
