import { Request, Response } from "express";
import Task from "../model/tasks.model";

export const index = async (req: Request, res: Response) => {
  //find
  const find = {
    deleted: false,
  }

  if(req.query.status){
    find["status"] = req.query.status;
  }
  //end find

  //sort
  const sort = {

  }
  if(req.query.sortKey && req.query.sortValue){
    const sortKey = req.query.sortKey.toLocaleString();
    sort[sortKey] = req.query.sortValue;
  }
  //end sort

  const tasks = await Task.find(find).sort(sort);

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
