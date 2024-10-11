import express, { Request, Response } from 'express';
import mainRouter from './routes';
import rateLimit from 'express-rate-limit';
const app = express();
const port = 3000;

let limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour.'
})

app.use('/api',limiter);
app.use(express.json())

app.use('/api',mainRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
