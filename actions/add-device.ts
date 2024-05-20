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

export const addDevices = async (devices: z.infer<typeof DeviceSchema>[]) => {
  if (!devices || devices.length === 0) return { error: 'Відстуні дані про пристрої' };

  const validatedFields = devices.map(item => DeviceSchema.safeParse(item));
  const invalidDevices = validatedFields.filter(device => !device.success);

  if (invalidDevices.length > 0) {
    return { error: 'Невірно заповненні поля в деяких пристроях' };
  }

  const dataToCreate = validatedFields
    .filter(device => device.success)
    .map(device => {
      return {
        nameDevice: device.data?.nameDevice as string,
        kwMin: device.data?.kwMin as string,
        kwMax: device.data?.kwMax as string,
        stepKw: device.data?.stepKw as string,
        maxKwMonth: device.data?.maxKwMonth as string,
        stepKwMin: device.data?.stepKwMin as string,
        stepKwMax: device.data?.stepKwMax as string,
      };
    });

  try {
    const createdDevices = await db.device.createMany({
      data: dataToCreate,
      skipDuplicates: true,
    });

    return { success: 'Пристрої успішно додано!' };
  } catch (error) {
    console.error('Error creating devices:', error);
    return { error: 'Помилка під час створення пристроїв' };
  }
};
