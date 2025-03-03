import jwt from "jsonwebtoken";
import { User } from "../models/Iuser.model";
import { Request, Response, NextFunction } from "express";
import { catchError } from "../utils/catchError";

const verifyAccessToken = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization
        : null;
    if (!token) {
      throw new Error("Token is required");
    }
    const accessToken = token.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
      (err, decoded) => {
          if (err) {
              throw new Error("Invalid token");
            }
        // @ts-ignore
        req.data = decoded;
        next();
      }
    );
  }
);
const verifyRefreshToken = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken;
    if (!token) {
      throw new Error("Token is required");
    }
    jwt.verify(
      token,
      process.env.REFRESH_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          throw new Error("Invalid token");
        }
        // @ts-ignore
        req.data = decoded.id;
        next();
      }
    );
  }
);
const isAdmin = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = await User.findById(req.data.id);
    if (!user) {
      res.status(400).json({ message: "Invalid User" });
      return;
    }
    if (!user.isAdmin) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    next();
  }
);
export const authMiddle = { verifyAccessToken, verifyRefreshToken, isAdmin };
