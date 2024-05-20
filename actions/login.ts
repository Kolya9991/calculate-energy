'use server';
import * as z from "zod";
import {LoginSchema} from "@/schemas";
import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";
import {getUserByEmail} from "@/data/user";
import {generateVerificationToken, generateTwoFactorToken} from "@/lib/tokens";
import {sendVerificationEmail, sendTwoFactorTokenEmail} from "@/lib/mail";
import {getTwoFactorTokenByEmail} from "@/data/two-factor-token";
import {db} from "@/lib/db";
import {getTwoFactorConfirmationByUserId} from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return {error: 'Сталась помилка під час авторизації'};
  }

  const {email, password, code} = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return {error: "Електронна пошта не існує"}
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return {success: 'Підтвердження відправлено на електронну пошту'};
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return {error: 'Неправильний код'}
      }
      if (twoFactorToken.token !== code) {
        return {error: 'Неправильний код'}
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return {error: 'Термін дії коду закінчився'}
      }

      await db.twoFactorToken.delete({
        where: {id: twoFactorToken.id},
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {id: existingConfirmation.id},
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      })

    } else {
      //TODO: check work twoFactor
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token
      )
      return {twoFactor: true}
    }
  }

  try {
    await signIn("credentials", {email, password, redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT});
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return {error: 'Невірні облікові дані'};
        default:
          return {error: ''};
      }
    }
    throw err;
  }
};
