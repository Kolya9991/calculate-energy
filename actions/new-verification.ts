'use server';

import {db} from '@/lib/db'
import {getUserByEmail} from "@/data/user";
import {getVerificationTokenByToken} from "@/data/verification";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return {error: 'Токен не існує'};
  }
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {error: 'Термін дії токену закінчився'};
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {error: 'Електронна пошта не існує'}
  }

  await db.user.update({
    where: {id: existingUser.id},
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  })

  await db.verificationToken.delete({
    where: {id: existingToken.id}
  })

  return {success: 'Успішна перевірка адреси електронної пошти'};
}