'use client';
import { FC, useState, useEffect, useTransition } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { CalculateDevices, DeviceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateCreateMany } from "@/actions/calculate";
import { getDevices } from "@/actions/getDevices";
import { Input } from "@/components/ui/input";
import { periodOptions } from "@/constans";
import ImportDevices from "@/components/import-devices/ImportDevices";
import ExportTemplate from "@/components/export-template/ExportTemplate";
import PieChart from "@/components/pie-chart/PieChart";

const DevicesSchema = z.array(DeviceSchema);

const defaultDevice = {
  id: '',
  nameDevice: '',
  count: '0',
  hoursWork: '0',
  period: periodOptions[0].label,
  kw: '10',
  kwMonth: '10'
};

const EnergyCalculator: FC = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [devices, setDevices] = useState<z.infer<typeof DevicesSchema>>([]);
  const [stepKwValues, setStepKwValues] = useState<{ [key: number]: number }>({});
  const [stepKwMaxValues, setStepKwMaxValues] = useState<{ [key: number]: number }>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [calculatedData, setCalculatedData] = useState<z.infer<typeof CalculateDevices>[] | null>(null);

  const form = useForm<{
    devices: z.infer<typeof CalculateDevices>[]
  }>({
    resolver: zodResolver(z.object({ devices: z.array(CalculateDevices) })),
    defaultValues: {
      devices: [defaultDevice],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "devices"
  });

  useEffect(() => {
    getDevices()
      .then((devices) => {
        setDevices(devices);
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
      });
  }, []);

  const calculateKwMonth = (count: number, hoursWork: number, kw: number, period: string) => {
    let daysInPeriod = 30; // Default to month
    if (period === "В день") daysInPeriod = 1;
    if (period === "В тиждень") daysInPeriod = 7;

    return count * hoursWork * kw * daysInPeriod;
  };

  const onSubmit = async (values: { devices: z.infer<typeof CalculateDevices>[] }) => {
    setError('');
    setSuccess('');
    startTransition(async () => {
      try {
        const data = await calculateCreateMany(values.devices);
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          setIsSubmitDisabled(true);
          setCalculatedData(values.devices);
        }
      } catch (err) {
        console.error('Error during submission:', err);
        setError('An error occurred while submitting the form.');
      }
    });
  };

  const handleDeviceChange = (index: number, value: string) => {
    const device = devices.find((d) => d.nameDevice === value);
    if (device) {
      setStepKwValues((prev) => ({ ...prev, [index]: Number(device.stepKw) }));
      setStepKwMaxValues((prev) => ({ ...prev, [index]: Number(device.stepKwMax) }));
    }
  };

  const handleAddDevice = () => {
    append(defaultDevice);
    setIsSubmitDisabled(false);
  };

  const handleImport = async (importedDevices: z.infer<typeof CalculateDevices>[]) => {
    const devicesWithKwMonth = importedDevices.map(device => ({
      ...device,
      kwMonth: calculateKwMonth(Number(device.count), Number(device.hoursWork), Number(device.kw), device.period).toString()
    }));

    replace(devicesWithKwMonth);
    setIsSubmitDisabled(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between items-center flex-wrap mb-2'>
        <ImportDevices onImport={handleImport} />
        <ExportTemplate disabledWordTemplate />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 border-b pb-4">
                <FormField
                  name={`devices.${index}.nameDevice`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Назва пристрою</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleDeviceChange(index, value);
                            form.setValue(`devices.${index}.kwMonth`, calculateKwMonth(
                              Number(form.getValues(`devices.${index}.count`)),
                              Number(form.getValues(`devices.${index}.hoursWork`)),
                              Number(form.getValues(`devices.${index}.kw`)),
                              form.getValues(`devices.${index}.period`)
                            ).toString());
                          }}
                          disabled={isPending}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Виберіть пристрій" />
                          </SelectTrigger>
                          <SelectContent>
                            {devices.map((device) => (
                              <SelectItem key={device.id} value={device.nameDevice}>
                                {device.nameDevice}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch(`devices.${index}.nameDevice`) && (
                  <>
                    <FormField
                      name={`devices.${index}.count`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Кількість</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              onChange={(e) => {
                                field.onChange(e);
                                form.setValue(`devices.${index}.kwMonth`, calculateKwMonth(
                                  Number(e.target.value),
                                  Number(form.getValues(`devices.${index}.hoursWork`)),
                                  Number(form.getValues(`devices.${index}.kw`)),
                                  form.getValues(`devices.${index}.period`)
                                ).toString());
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`devices.${index}.hoursWork`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Часи роботи</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              onChange={(e) => {
                                field.onChange(e);
                                form.setValue(`devices.${index}.kwMonth`, calculateKwMonth(
                                  Number(form.getValues(`devices.${index}.count`)),
                                  Number(e.target.value),
                                  Number(form.getValues(`devices.${index}.kw`)),
                                  form.getValues(`devices.${index}.period`)
                                ).toString());
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`devices.${index}.period`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Період</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value);
                                form.setValue(`devices.${index}.kwMonth`, calculateKwMonth(
                                  Number(form.getValues(`devices.${index}.count`)),
                                  Number(form.getValues(`devices.${index}.hoursWork`)),
                                  Number(form.getValues(`devices.${index}.kw`)),
                                  value
                                ).toString());
                              }}
                              disabled={false}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Виберіть період" />
                              </SelectTrigger>
                              <SelectContent>
                                {periodOptions.map((option) => (
                                  <SelectItem key={option.code} value={option.label}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`devices.${index}.kw`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>кВт</FormLabel>
                          <FormControl>
                            <Slider
                              value={[Number(field.value)]}
                              step={stepKwValues[index] || 1}
                              max={stepKwMaxValues[index] || 100}
                              onValueChange={(value) => {
                                field.onChange(String(value[0]));
                                form.setValue(`devices.${index}.kwMonth`, calculateKwMonth(
                                  Number(form.getValues(`devices.${index}.count`)),
                                  Number(form.getValues(`devices.${index}.hoursWork`)),
                                  value[0],
                                  form.getValues(`devices.${index}.period`)
                                ).toString());
                              }}
                              disabled={isPending}
                            />
                          </FormControl>
                          <div className="mt-2 text-sm text-gray-500">Крок кВт: {field.value}</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`devices.${index}.kwMonth`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>кВт в місяць</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={true} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" onClick={() => {
                      remove(index);
                      setIsSubmitDisabled(false);
                    }} className="w-full mt-2"> Видалити
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
          <Button type="button" onClick={handleAddDevice} className="w-full">
            Додати
          </Button>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full mt-6" disabled={isPending || isSubmitDisabled}>
            Розрахувати
          </Button>
        </form>
      </Form>
      {calculatedData && (
        <div className="mt-6">
          <PieChart data={calculatedData.map(device => ({
            ...device,
            kwMonth: calculateKwMonth(
              Number(device.count),
              Number(device.hoursWork),
              Number(device.kw),
              device.period
            ).toString()
          }))} />
        </div>
      )}
    </div>
  );
};

export default EnergyCalculator;

