'use server';
import * as z from 'zod';
import {db} from '@/lib/db';
import {ContactUsSchema} from "@/schemas";
export const createContactUs = async (values: z.infer<typeof ContactUsSchema>) => {
  if (!values) return {error: 'Відстуні дані!'};
  const validatedFields = ContactUsSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Невірно заповненні поля'}
  }
  const {name, email, phone, comment} = validatedFields.data

  if(validatedFields.success) {
    await db.contactUs.create({
      data: {
        name,
        email,
        phone,
        comment
      }
    })
    return {success: 'Питання успішно відправлено'}
  }
}
