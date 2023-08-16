import express, { Application } from "express";
import config from "./config";
import userRouter from "./routes/users.routes";
import errorMiddleware from "./middlewares/error.middleware";

const app: Application = express();

app.use(express.json());
// app.use('/', (req, res) => res.json({ foo: 'bar'}));
app.use(errorMiddleware)
app.use('/api', userRouter)

// middlewares

app.listen(config.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
})