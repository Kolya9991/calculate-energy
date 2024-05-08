'use server';

import {db} from "@/lib/db";
import * as z from "zod";
import {DeviceSchema} from "@/schemas";

export const updateDevice = async (values: z.infer<typeof DeviceSchema>) => {
  if (!values) return {error: 'Відстуні дані про пристрій'};
  const validatedFields = DeviceSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Невірно заповненні поля'}
  }
  const {id, nameDevice, maxKwMonth, kwMax, stepKw, kwMin, stepKwMin, stepKwMax} = validatedFields.data;
  try {
    await db.device.update({
      where: {id},
      data: {
        nameDevice,
        maxKwMonth,
        kwMax,
        stepKw,
        kwMin,
        stepKwMin,
        stepKwMax
      }
    });
    return {success: 'Пристрій успішно оновлено!'};
  } catch (error) {
    console.error('Error updating device:', error);
    return {error: 'Помилка при оновленні пристрою'};
  }
}
