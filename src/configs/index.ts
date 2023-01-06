import { config } from "dotenv";
config();

export const port: any = process.env.PORT || 5000;
export const API_URL_V1: string = process.env.API_URL_V1;

export const JWT_SECRET: string = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN;
export const JWT_COOKIE_EXPIRES: any = process.env.JWT_COOKIE_EXPIRES;

export const storeUsername = "admin";
export const storePassword = "password";