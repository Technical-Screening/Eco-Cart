import {DBConfig} from "./index"
import * as pg from 'pg'
const { Pool } = pg

export const pool = new Pool(DBConfig);

pool.connect((err) => {
    if (err) {
      console.log('Error connecting to database...', err);
      return;
    }
    console.log('Database Connection established!');
});