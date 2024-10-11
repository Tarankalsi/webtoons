import express from 'express';
import { loginSchema } from '../zod'; 
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const userRouter = express.Router();
const prisma = new PrismaClient();


const secret = process.env.JWT_SECRET as string;
if (!secret) {
    throw new Error("JWT secret is undefined");
}


userRouter.post('/signin', async (req, res) => {
  const body = req.body;

  
  const { success, error } = loginSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      message: 'Invalid Login',
      error: error?.issues || 'Validation failed',
    });
  }


  const userExist = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });


  if (!userExist) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  const token = jwt.sign({ userId: userExist.userId }, secret, { expiresIn: '1h' });

  return res.status(200).json({
    message: 'Login successful',
    token,
  });
});


userRouter.post('/signup', async (req, res) => {
  const body = req.body;


  const { success, error } = loginSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      message: 'Invalid Signup',
      error: error?.issues || 'Validation failed',
    });
  }


  const existingUser = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (existingUser) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }


  const newUser = await prisma.user.create({
    data: {
      username: body.username,
    },
  });


  const token = jwt.sign({ userId: newUser.userId }, secret, { expiresIn: '1h' });

  return res.status(200).json({
    message: 'Sign Up successfully',
    token,
  });
});

export default userRouter;
