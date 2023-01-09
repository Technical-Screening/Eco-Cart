import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import { JWT_COOKIE_EXPIRES, JWT_EXPIRES_IN, JWT_SECRET,
    storeUsername, storePassword
} from "../configs/index";


const setToken = (id: string, res: Response) => {
    const token = jwt.sign({ id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  
    console.log("the token is " + token);
  
    const cookieOptions = {
      expires: new Date(
        Date.now() + JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      Path: "/",
      HttpOnly: true,
      Secure: true,
      SameSite: "None",
    };
    res.cookie("token", token, cookieOptions);
};

export const verifyToken = (token: string, res: Response) => {
    // if the cookie is not set, return an unauthorized error
    if (!token) res.status(401).end();
  
    try {
      // Parse the JWT string and store the result in `payload`.
      // Note that we are passing the key in this method as well. This method will throw an error
      // if the token is invalid (if it has expired according to the expiry time we set on sign in),
      // or if the signature does not match
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      return payload.id;
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        // if the error thrown is because the JWT is unauthorized, return a 401 error
        res.status(401).end();
      }
      // otherwise, return a bad request error
        res.status(400).end();
    }
  
    // Finally, return the id.
    // res.send(`Verified ${payload.id}!`)
};

export const login = async (req:Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
            message: "Please Provide an username and password",
            });
        }
        const validUser = (storeUsername === username && password === storePassword)

        if (!validUser) {
            return res
            .status(401)
            .json({ message: "User name or Password is incorrect" });
        } else {
            setToken(storeUsername, res);
            return res.json({
                statusCode: 200,
                body: JSON.stringify(storeUsername),
            });
        }
    } catch (err) {
      console.log(err);
    }
};