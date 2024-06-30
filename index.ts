import express,{ Express , Request , Response} from "express";
import dotenv from "dotenv"
import * as database from "./config/database";
import mainV1Router from "./api/v1/routers/index.router";
import bodyParser  from "body-parser";
dotenv.config();

database.connect();

const app: Express = express();
const port: number | String = process.env.PORT || 3000;

// parse application/json
app.use(bodyParser.json());

mainV1Router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
