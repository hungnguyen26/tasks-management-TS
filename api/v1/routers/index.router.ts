import { Express } from "express";
import { taskRouter } from "./tasks.router";

const mainV1Router = (app: Express): void => {

  const version = "/api/v1";

  app.use(version + "/tasks" ,taskRouter);

};

export default mainV1Router;
