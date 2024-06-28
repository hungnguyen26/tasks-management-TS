import express,{ Express , Request , Response} from "express";
import dotenv from "dotenv"
import * as database from "./config/database";
import Task from "./model/tasks.model";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | String = process.env.PORT || 3000;

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted:false
  })
  res.json({
    code:200,
    tasks: tasks
  });
});

app.get("/tasks/detail/:id", async (req: Request, res: Response) => {
  const id: String = req.params.id;

  const task = await Task.findOne({
    deleted:false,
    _id: id
  })
  res.json({
    code:200,
    task: task
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
