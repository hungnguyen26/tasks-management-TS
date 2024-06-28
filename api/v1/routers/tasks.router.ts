import { Router , Request , Response} from "express";
import Task from "../../../model/tasks.model";
const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false,
  });
  res.json(tasks);
});

router.get("/detail/:id", async (req: Request, res: Response) => {
  const id: String = req.params.id;

  const task = await Task.findOne({
    deleted: false,
    _id: id,
  });
  res.json({
    code: 200,
    task: task,
  });
});
export const taskRouter: Router =  router;
