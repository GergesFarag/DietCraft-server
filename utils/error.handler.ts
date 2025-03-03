import { Request, Response, NextFunction } from "express";
export default class ErrorsHandler {
  static notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({ message: "Not Found" });
  }
  static errorHandle(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(err.stack);
    res.status(500).json({ err: err.name, message: err.message });
  }
}
