'use server';

import * as z from 'zod';
import {db} from '@/lib/db';
import {DeviceSchema} from "@/schemas";

export const addDevice = async (values: z.infer<typeof DeviceSchema>) => {
  if (!values) return {error: 'Відстуні дані про пристрій'};
  const validatedFields = DeviceSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Невірно заповненні поля'}
  }

  const {nameDevice, maxKwMonth, kwMax, stepKw, kwMin, stepKwMax, stepKwMin} = validatedFields.data;
  if (validatedFields.success) {
    await db.device.create({
      data: {
        nameDevice,
        kwMin,
        kwMax,
        stepKw,
        maxKwMonth,
        stepKwMin,
        stepKwMax
      }
    })
    return {success: 'Пристрій успішно додано'}
  }
}
