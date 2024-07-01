import { Express } from "express";
import { taskRouter } from "./tasks.router";
import { usersRouter } from "./users.router";

import * as authMiddleware from "../middlewares/auth.middleware";


const mainV1Router = (app: Express): void => {

  const version = "/api/v1";

  app.use(version + "/tasks" ,authMiddleware.requiredAuth ,taskRouter);

  app.use(version + "/users" ,usersRouter);

};

export default mainV1Router;
