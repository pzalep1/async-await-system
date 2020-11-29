"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBearerToken = void 0;
const jwt = require("jsonwebtoken");
function generateBearerToken(user, expires) {
    const expiration = expires ? expires : 86400;
    const payload = {
        userId: user.userId,
        fName: user.fName,
        lName: user.lName,
        email: user.email,
    };
    const options = {
        issuer: process.env.ISSUER,
        expiresIn: expiration,
        audience: user.email
    };
    const token = jwt.sign(payload, process.env.KEY, options);
    return token;
}
exports.generateBearerToken = generateBearerToken;
//# sourceMappingURL=generateBearerToken.js.map