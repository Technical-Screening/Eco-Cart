import { config } from "dotenv";
config();
import * as pg from 'pg'
const { Pool } = pg

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME
});

pool.connect((err) => {
    if (err) {
      console.log('Erro connecting to database...', err);
      return;
    }
    console.log('Connection established!');
});


// AWS.config.update(awsConfig);

// export const docClient =  new AWS.DynamoDB.DocumentClient({"endpoint": process.env.NW_AWS_DYNAMODB_ENDPOINT});