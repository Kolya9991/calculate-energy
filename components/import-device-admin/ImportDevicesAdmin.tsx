'use client';
import ImportDevices from "@/components/import-devices/ImportDevices";
import ExportTemplate from "@/components/export-template/ExportTemplate";
import * as z from "zod";
import { DeviceSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDevices } from "@/actions/add-device";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

const defaultDevice = {
  id: '',
  nameDevice: '',
  kwMin: '',
  kwMax: '',
  stepKw: '',
  maxKwMonth: '',
  stepKwMin: '',
  stepKwMax: ''
};

const ImportDevicesAdmin = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<{
    devices: z.infer<typeof DeviceSchema>[]
  }>({
    resolver: zodResolver(z.object({ devices: z.array(DeviceSchema) })),
    defaultValues: {
      devices: [defaultDevice],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "devices"
  });

  const onSubmit = async (values: { devices: z.infer<typeof DeviceSchema>[] }) => {
    setError('');
    setSuccess('');
    startTransition(async () => {
      try {
        const data = await addDevices(values.devices);
        console.log(values.devices)
        console.log("Response data:", data); // Log response data
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          setIsSubmitDisabled(true);
        }
      } catch (err) {
        console.error('Error during submission:', err); // Log errors
        setError('An error occurred while submitting the form.');
      }
    });
  };

  const handleAddDevice = () => {
    append(defaultDevice);
    setIsSubmitDisabled(false);
  };

  const handleImport = async (importedDevices: z.infer<typeof DeviceSchema>[]) => {
    replace(importedDevices);
    setIsSubmitDisabled(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between items-center flex-wrap mb-2'>
        <ImportDevices onImport={handleImport} importAdminDevice />
        <ExportTemplate disabledWordTemplate adminTemplateExcel />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            {fields.map((field, index) => (
              <div key={field.id} className='space-y-4 border-b pb-4'>
                <FormField
                  name={`devices.${index}.nameDevice`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Назва пристрою</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`devices.${index}.kwMin`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>кВт Мін.</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`devices.${index}.kwMax`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>кВт Макс.</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`devices.${index}.stepKw`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Крок кВт</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`devices.${index}.maxKwMonth`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Макс кВт</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`devices.${index}.stepKwMin`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Мінімальний крок kW</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`devices.${index}.stepKwMax`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Максимальний крок kW</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => {
                  remove(index);
                  setIsSubmitDisabled(false);
                }} className="w-full mt-2">
                  Видалити
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" onClick={handleAddDevice} className="w-full">
            Додати
          </Button>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full mt-6" disabled={isPending || isSubmitDisabled}>
            Додати пристрої
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ImportDevicesAdmin;
