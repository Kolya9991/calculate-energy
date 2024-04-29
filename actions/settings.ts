'use server'
import * as z from 'zod'
import {getUserByEmail, getUserById} from "@/data/user";
import {SettingSchema} from "@/schemas";
import {currentUser} from "@/lib/auth-lib";
import {db} from "@/lib/db";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();
  if (!user) {
    return {error: 'Unauthorized'}
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return {error: 'Unauthorized'}
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error:  'Електронна пошта вже існує' }
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {success: 'Підтвердження надіслано на email'}
  }

  if(values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!passwordMatch) {
      return {error: 'Неправильний пароль'}
    }

    values.password = await bcrypt.hash(values.newPassword, 10);
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {id: dbUser.id},
    data: {
      ...values
    }
  })

  return {success: 'Налаштування оновлено'}
}