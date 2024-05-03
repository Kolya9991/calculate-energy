'use server';
import {db} from "@/lib/db";

export const getDeviceById = async(id: string) => {
  const device = await db.device.findFirst({
    where: {id}
  });
  return device
}