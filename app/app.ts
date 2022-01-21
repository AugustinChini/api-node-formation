import express from "express";
import bodyparser from "body-parser";
import { TodoRoutes } from "./todo/todo.routes.config";

const app = express();
const routes: any = [];
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "5mb" }));
app.use(function (err: any, req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    req.header("Access-Control-Request-Headers")
  );
  if (req.method === "OPTIONS") {
    return res.status(200).send();
    // test si cette erreur est un erreur Multer
  } else if (err) {
    res.statusCode = 500;
    res.send(err.message);
  } else {
    next();
  }
});

// création des routes
routes.push(new TodoRoutes(app));

app.get("/", (req: any, res: any) => {
  res.send({
    env: "DEV",
    desc: "Application Node de formation CILEA.",
  });
});

export default app;
