import jwt from "jsonwebtoken";
import {secretKey} from "./secret.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, {expiresIn: '1h'});
}
