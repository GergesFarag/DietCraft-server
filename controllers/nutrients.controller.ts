import { NextFunction, Request, Response } from "express";
import { catchError } from "../utils/catchError";
import { CustomError } from "../utils/error.handler";
import { HttpStatus } from "../utils/HttpStatus";
import { apiFetch } from "../utils/apiFetch";
const API = "https://api.calorieninjas.com/v1/nutrition?";

const getNutrients = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { item } = req.query;
    if (!item) {
      return next(
        new CustomError(
          "Invalid Data",
          "Please provide a food item",
          HttpStatus.BAD_REQUEST
        )
      );
    }
    const data = await apiFetch(`${API}query=${item}`, {
      "X-Api-Key": process.env.API_KEY as string,
    });
    if (data.items.length === 0) {
      return next(
        new CustomError(
          "Invalid Data",
          "Please provide a valid food item",
          HttpStatus.BAD_REQUEST
        )
      );
    }
    res.status(200).json({
      message: `${item} nutrients got successfully `,
      data: data.items,
    });
  }
);
export const nutrientsController = {
  getNutrients,
};
