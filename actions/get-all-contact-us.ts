'use server';
import {db} from '@/lib/db';

export const getAllContactUs = async () => {
  const getAllContactsUsQuestion = await db.contactUs.findMany()
  return getAllContactsUsQuestion;
}
