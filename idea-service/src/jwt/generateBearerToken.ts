import * as jwt from 'jsonwebtoken';
import { stringify } from 'querystring';

/**
 * Takes a user object and generates a JWT for the user
 *
 * TODO: Excess data should be removed from the token's payload (name, organization, email)
 */
export function generateBearerToken(user: any, expires?: number) {
  const expiration = expires ? expires : 86400;
    const payload = {
      userId: user.userId,
      fName: user.fName,
      lName: user.lName,
      email: user.email,
    };
    const options = {
      issuer: 'THIS_IS_AN_ISSUER',
      expiresIn: expiration,
      audience: user.email
    };
    const token = jwt.sign(payload, 'THIS_IS_A_KEY', options);
    return token;
  }