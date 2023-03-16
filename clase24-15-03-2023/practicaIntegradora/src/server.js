import express from "express";
import config from "./config/config.js";
if (config.mongo_uri) import("./config/db.js");
import UserRouter from './routers/user.router.js'
import productRouter from './routers/product.router.js'
import AuthRouter from './routers/auth.router.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users',UserRouter)
app.use('/api/products',productRouter.getRouter())
app.use('/api/auth',AuthRouter)

const server = app.listen(config.port, () =>
  console.log(`🔥 Server started on port http://localhost:${config.port}`),
);
server.on("error", (err) => console.log(err));
