import { Router , Request , Response} from "express";
import Task from "../model/tasks.model";
const router: Router = Router();

import * as controller from "../controllers/tasks.controllers";

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.post("/create", controller.create);

router.patch("/edit/:id", controller.edit);

export const taskRouter: Router =  router;
