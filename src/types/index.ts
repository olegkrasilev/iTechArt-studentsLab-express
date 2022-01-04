import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestUser extends Request {
  body: {
    email: string | undefined;
    password: string | undefined;
    id?: number | undefined;
    newPassword?: string | undefined;
  };
}

export type Token = string | undefined;

export type DecodedToken = JwtPayload | undefined;

export type IsUserChangedPassword = boolean | undefined;

export type MailOptions = {
  from: string;
  to: string;
  subject: string;
  text: string;
};
