import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ error: 'Ism kiritish majburiy' })
    .min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
  email: z
    .string({ error: 'Email kiritish majburiy' })
    .min(1, 'Email kiritish majburiy')
    .email("Email formati noto'g'ri"),
  password: z
    .string({ error: 'Parol kiritish majburiy' })
    .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
