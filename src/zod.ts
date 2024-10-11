import zod from "zod";

export const loginSchema = zod.object({
    username : zod.string()
})

export const webtoonSchema = zod.object({
    title : zod.string(),
    description : zod.string(),
    characters : zod.array(zod.string())
})

