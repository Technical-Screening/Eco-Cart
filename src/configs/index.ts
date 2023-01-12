import { config } from "dotenv";
config();

export const port: any = process.env.PORT || 5000;
export const API_URL_V1: string = process.env.API_URL_V1;

export const JWT_SECRET: string = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN;
export const JWT_COOKIE_EXPIRES: any = process.env.JWT_COOKIE_EXPIRES;

export const storeUsername = "admin";
export const storePassword = "password";

export const DBConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME
};
  
export const DB_TABLE = process.env.DB_TABLE;
export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_PASS = process.env.REDIS_PASS;
