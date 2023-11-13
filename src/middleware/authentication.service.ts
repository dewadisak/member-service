import express from "express";
import jwt from "jsonwebtoken";

  export async function AuthenticationMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    if (!token) {
      return response.status(403).send('A token is required for authentication')
    }
    try {
      console.log('de', token)
      const decoded = jwt.verify(token, 'qwertyuiop');
      console.log('decoded', decoded)
      request.body = decoded;

    } catch (err) {
      return response.status(401).send("Invalid Token");
    }
    return next();

  }