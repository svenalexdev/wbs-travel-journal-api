import { z } from 'zod/v4';

export const userSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string().min(8).max(12),
});

export const signInSchema = z.object({
    email: z.string(),
    password: z.string().min(8).max(12),
});

export const postSchema = z.object({
    title: z.string(),
    image: z.string(),
    content: z.string(),
    author: z.string(),
});
