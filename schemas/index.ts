import * as z from 'zod'
import {UserRole} from "@prisma/client";

export const LoginSchema = z.object({
  email: z.string().email({message: "Email обов'язкове поле"}),
  password: z.string({
    invalid_type_error: 'Пароль є необхідним'
  }).min(6, {message: 'Пароль має бути більше ніж 6 символів'}),
  code: z.optional(z.string())
})

export const RegisterSchema = z.object({
  email: z.string().email({message: "Email обов'язкове поле"}),
  password: z.string({
    invalid_type_error: 'Пароль є необхідним'
  }).min(6, {message: 'Пароль має бути більше ніж 6 символів'}),
  name: z.string().min(1, {message: "Ім'я є обов'язковим полем"}),
})

export const ResetSchema = z.object({
  email: z.string().email({message: "Email обов'язкове поле"}),
})

export const NewPasswordSchema = z.object({
  password: z.string({
    invalid_type_error: 'Пароль є необхідним'
  }).min(6, {message: 'Пароль має бути більше ніж 6 символів'}),
})

export const SettingSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
}).refine((data) => {
  if (data.password && !data.newPassword) {
    return false;
  }
  return true;
}, {
  message: 'Новий пароль є обов`язковим',
  path: ['password']
})