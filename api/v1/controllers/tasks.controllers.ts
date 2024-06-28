import { Request, Response } from "express";
import Task from "../model/tasks.model";

export const index = async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false,
  });
  res.json(tasks);
};

export const detail = async (req: Request, res: Response) => {
  const id: String = req.params.id;

  const task = await Task.findOne({
    deleted: false,
    _id: id,
  });
  res.json({
    code: 200,
    task: task,
  });
};
