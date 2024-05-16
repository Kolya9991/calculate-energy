'use server';
import * as z from 'zod';
import {db} from '@/lib/db';
import {CalculateDevices} from "@/schemas";
import {currentUser} from "@/lib/auth-lib";

export const calculateCreate = async (values: z.infer<typeof CalculateDevices>) => {
  if (!values) return {error: 'Відстуні дані про пристрій'};

  const validatedFields = CalculateDevices.safeParse(values);

  if (!validatedFields.success) {
    return {error: 'Невірно заповненні поля'}
  }
  const user = await currentUser()
  const {id, nameDevice, kw, kwMonth, period, hoursWork, count} = validatedFields.data;

  if (validatedFields.success) {
    await db.calculate.create({
      data: {
        userId: user?.id,
        nameDevice,
        count,
        hoursWork,
        period,
        kw,
        kwMonth
      }
    })
    return {success: 'success'}
  }
}
