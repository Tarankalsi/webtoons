import express from "express"
import { Character, PrismaClient } from "@prisma/client";
import authMiddleware from "../middlewares/auth.middleware";
import { webtoonSchema } from "../zod";

const webtoonRouter = express.Router()
const prisma = new PrismaClient();
webtoonRouter.get('/', async (req, res) => {
    try {
        const webtoons = await prisma.webtoon.findMany({
            include: {
                characters: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return res.status(200).json(webtoons);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
});

webtoonRouter.post('/create', authMiddleware, async (req, res) => {
    const body = req.body;

    // Check if userId is present
    if (!req.userId) {
        return res.status(400).json({
            message: "User not allowed",
        });
    }

    const { success, error } = webtoonSchema.safeParse(body);

    if (!success) {
        return res.status(400).json({
            message: 'Input Validation Failed',
            error: error?.issues || 'Validation failed',
        });
    }


    try {
        console.log(body)
        console.log(req.userId)
        const newWebtoon = await prisma.webtoon.create({
            data: {
                title: body.title,
                description: body.description,
                userId: req.userId,
                characters: {
                    create: body.characters.map((character: string) => ({ name: character })),
                },
            }
        });
        return res.status(201).json({
            message: "Webtoon created successfully",
            data: newWebtoon
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating webtoon', error: error });
    }
});

webtoonRouter.get('/:webtoonId', async (req, res) => {
    const { webtoonId } = req.params;
    try {
        const webtoon = await prisma.webtoon.findUnique({
            where: {
                webtoonId: webtoonId,
            },
            include: {
                characters: {
                    select: {
                        name: true
                    },
                },
            },
        })

        res.status(200).json({
            data: webtoon
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

webtoonRouter.delete('/:webtoonId', authMiddleware, async (req, res) => {
    const { webtoonId } = req.params;
    try {
        await prisma.webtoon.delete({
            where: {
                webtoonId: webtoonId,
            },
        });
        return res.status(200).json({
            message: "Webtoon deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting webtoon' });
    }
})

export default webtoonRouter