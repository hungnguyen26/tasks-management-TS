import { Request, Response } from "express";
import Task from "../model/tasks.model";
import paginitionHelper from "../../../helpers/paginition";
import searchHelper from "../../../helpers/search";

// [GET] /api/v1/tasks
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

// [GET] /api/v1/tasks/detail/:id
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

// [PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response)=>{
  try {
    const id: String = req.params.id;
    const status: String = req.body.status;
    await Task.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );
    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!!",
    });
  } catch (error) {
    res.json({
      code: 404,
      message: "Không tồn tại!!",
    });
  }
  
}

// [PATCH] /api/v1/tasks/changeMulti
export const changeMulti = async (req: Request, res: Response)=>{
  try {
    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;
    
    switch (key) {
      case "status":
        await Task.updateMany({
          _id: {$in:ids}
        },{
          status: value
        });
        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!!",
        });
        break;
      case "delete":
        await Task.updateMany({
          _id: {$in:ids}
        },{
          deleted: true,
          deletedAt: new Date()
        });
        res.json({
          code: 200,
          message: "Xóa thành công!!",
        });
        break;
      default:
        res.json({
          code: 404,
          message: "Không tồn tại!!",
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 404,
      message: "Không tồn tại!!",
    });
  }
}

// [POST] /api/v1/tasks/create
export const create = async (req: Request, res: Response)=>{
  try {
    const task = new Task(req.body);
    const data  = await task.save();

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!!",
      data: data
    });
  } catch (error) {
    res.json({
      code: 404,
      message: "Không tồn tại!!",
    });
  }
  
}

// [POST] /api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response)=>{
  try {
    const id = req.params.id;
    await Task.updateOne({
      _id: id
    }, req.body);

    res.json({
      code: 200,
      message: "Cập nhật thành công!!",
    });
    
  } catch (error) {
    res.json({
      code: 404,
      message: "Không tồn tại!!",
    });
  }
  
}

// [DELETE] /api/v1/tasks/delete
export const deleteTask = async (req: Request, res: Response)=>{
  try {
    const id = req.params.id;
    await Task.updateOne({
      _id: id
    },{
      deleted:true,
      deletedAt: new Date()
    });

    res.json({
      code: 200,
      message: "Xóa thành công!!",
    });
    
  } catch (error) {
    res.json({
      code: 404,
      message: "Không tồn tại!!",
    });
  }
}