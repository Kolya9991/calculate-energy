'use server';
import {db} from '@/lib/db';

export const getDevices = async () => {
  const getAllDevice = await db.device.findMany()
  return getAllDevice;
}