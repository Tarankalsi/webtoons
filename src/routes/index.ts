import express from "express"
import webtoonRouter from "./webtoonRouter";
import userRouter from "./user";

const mainRouter = express.Router();

mainRouter.use("/webtoons",webtoonRouter)
mainRouter.use("/user",userRouter)

export default mainRouter