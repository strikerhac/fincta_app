// import userModel from "../models/userModel";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let auth = req.headers.authorization;
  let token = null;

  if (auth?.startsWith("Bearer ")) {
    token = auth.substring(7, auth.length);
  } else {
    token = auth;
  }

  console.log(token);
  if (!token) {
    res.send("yo, we need a token");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({
          valid: false,
          auth: false,
          message: "you failed to authenticate",
        });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  }
};
