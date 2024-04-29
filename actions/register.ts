'use server';
import * as z from "zod";
import bcrypt from 'bcryptjs';
import {RegisterSchema} from "@/schemas";
import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return {error: 'Сталась помилка під час створення профілю'};
  }

  const {email, name, password} = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {error: 'Пошта вже використовується'}
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })
  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  )
  return {success: 'Підтвердження надіслано на електронну пошту!'};
};