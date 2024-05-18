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
import { calculateCreateMany } from "@/actions/calculate-create";
import { getDevices } from "@/actions/getDevices";
import { Input } from "@/components/ui/input";

const DevicesSchema = z.array(DeviceSchema);

const defaultDevice = {
  id: '',
  nameDevice: '',
  count: '0',
  hoursWork: '0',
  period: '0.01',
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

  const form = useForm<{
    devices: z.infer<typeof CalculateDevices>[]
  }>({
    resolver: zodResolver(z.object({ devices: z.array(CalculateDevices) })),
    defaultValues: {
      devices: [defaultDevice],
    },
  });

  const { fields, append, remove } = useFieldArray({
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
        }
      } catch (err) {
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

  return (
    <div className="container mx-auto p-4">
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
                <FormField
                  name={`devices.${index}.count`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Кількість</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
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
                        <Input {...field} disabled={isPending} />
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
                        <Input {...field} disabled={isPending} />
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
                          }}
                          disabled={isPending}
                        />
                      </FormControl>
                      <div className="mt-2 text-sm text-gray-500">Current kW: {field.value}</div>
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
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => {
                  remove(index)
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
          <Button type="submit" className="w-full" disabled={isPending || isSubmitDisabled}>
            Розрахувати
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EnergyCalculator;
