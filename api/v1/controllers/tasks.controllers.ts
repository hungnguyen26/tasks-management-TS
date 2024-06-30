import { Request, Response } from "express";
import Task from "../model/tasks.model";
import paginitionHelper from "../../../helpers/paginition";
import searchHelper from "../../../helpers/search";

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

   // phần phân trang
   const countTasks = await Task.countDocuments(find); // đếm tổng số sản phẩm
   let objectPagination = paginitionHelper(
     {
       limitItem: 2, // sl phần tử mỗi trang
       currentPage: 1,
     },
     req.query,
     countTasks
   );
   // end phần phân trang

   // search
   const objectSearch = searchHelper(req.query);

  if (req.query.keyword) {
    find['title'] = objectSearch.regex;
  }
  // end search

  const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItem)
  .skip(objectPagination.skip);;

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
