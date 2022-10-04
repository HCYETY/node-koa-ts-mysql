const jsonwebtoken = require('jsonwebtoken');
import { SECRET } from "../constants/index";

export default class JWT {
  public static generate (value: any, expires: string = '15days'): string {
    try {
      const jsonToken = jsonwebtoken.sign(value, SECRET, { expiresIn: expires });
      return 'Bearer ' + jsonToken;
    } catch (err) {
      console.log('jwt sign error --> ', err);
      return '';
    }
  }

  public static verify (authorization: string): boolean | object {
    // const token = authorization.split(' ')[1];
    const token = authorization.replace('Bearer ', '');
    try {
      return jsonwebtoken.verify(token, SECRET);
    } catch (err) {
      console.log('jwt sign error --> ', err);
      return false;
    }
  }
}
