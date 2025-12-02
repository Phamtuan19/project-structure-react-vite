import { z } from 'zod';

// Regex username: ít nhất 3 ký tự, gồm chữ, số, dấu _ hoặc -
// Regex email: chuẩn cơ bản
const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
   identifier: z
      .string()
      .min(1, { message: 'signin.errors.identifier_required' })
      .refine((val) => emailRegex.test(val) || usernameRegex.test(val), {
         message: 'signin.errors.identifier_invalid',
      }),
   password: z.string().min(1, { message: 'signin.errors.password_required' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
