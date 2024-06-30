import { Router , Request , Response} from "express";
import Task from "../model/tasks.model";
const router: Router = Router();

import * as controller from "../controllers/tasks.controllers";

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);
export const taskRouter: Router =  router;