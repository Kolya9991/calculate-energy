'use server';
import * as z from 'zod';
import {db} from '@/lib/db';
import {CalculateDevices} from "@/schemas";
import {currentUser} from "@/lib/auth-lib";

// Existing create function
export const calculate = async (values: z.infer<typeof CalculateDevices>) => {
  if (!values) return {error: 'Відстуні дані про пристрій'};

  const validatedFields = CalculateDevices.safeParse(values);

  if (!validatedFields.success) {
    return {error: 'Невірно заповненні поля'}
  }
  const user = await currentUser();
  const {nameDevice, kw, kwMonth, period, hoursWork, count} = validatedFields.data;

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
    });
    return {success: `Калькуляція прошла успішно!`}
  }
}

export const calculateCreateMany = async (devices: z.infer<typeof CalculateDevices>[]) => {
  if (!devices || devices.length === 0) return {error: 'Відстуні дані про пристрої'};

  const validatedDevices = devices.map(device => CalculateDevices.safeParse(device));

  const invalidDevices = validatedDevices.filter(device => !device.success);

  if (invalidDevices.length > 0) {
    return {error: 'Невірно заповненні поля в деяких пристроях'}
  }

  const user = await currentUser();

  const dataToCreate = validatedDevices
    .filter(device => device.success)
    .map(device => ({
      userId: user?.id as string,
      nameDevice: device?.data?.nameDevice as string,
      count: device?.data?.count as string,
      hoursWork: device?.data?.hoursWork as string,
      period: device?.data?.period as string,
      kw: device?.data?.kw as string,
      kwMonth: device?.data?.kwMonth as string,
    }));

  await db.calculate.createMany({
    data: dataToCreate,
    skipDuplicates: true
  });

  return {success: `Калькуляція ${dataToCreate.length} пристроїв прошла успішно!`}
}

export const getCalculate = async (userId?: string) => {
  const getAllCalculate = await db.calculate.findMany({
    where: {userId}
  })
  return getAllCalculate;
}
