import * as crypto from "crypto";

const generateRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

const secretKey = generateRandomString(32); // 生成一个 32 字符长度的随机字符串作为密钥


export {
    secretKey
}
