'use server';

import {db} from "@/lib/db";

export const deleteDevice = async (id: string) => {
  if(!id) return {error: 'Пристрій не знайдено!'}
  await db.device.delete({
    where: {id}
  })
  return {success: 'Пристрій видалено!'}
}