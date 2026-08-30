import { z } from 'zod';

/**
 * Login formasi uchun Zod validatsiya sxemasi.
 * 
 * @example
 * ```tsx
 * const { control, handleSubmit } = useForm<LoginFormData>({
 *   resolver: zodResolver(loginSchema),
 * });
 * ```
 */
export const loginSchema = z.object({
  email: z
    .string({ error: 'Email kiritish majburiy' })
    .min(1, 'Email kiritish majburiy')
    .email('Email formati noto\'g\'ri'),
  password: z
    .string({ error: 'Parol kiritish majburiy' })
    .min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
});

/** Login formasi ma'lumotlarining TypeScript turi */
export type LoginFormData = z.infer<typeof loginSchema>;
