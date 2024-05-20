'use client'
import {FC, useEffect, useState, useTransition} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Slider} from "@/components/ui/slider"; // Import the Slider component
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {CalculateDevices, DeviceSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {calculate} from "@/actions/calculate";
import {getDevices} from "@/actions/getDevices";
import {Input} from "@/components/ui/input";
import {periodOptions} from "@/constans";

interface ICalcFormProps {
}

const DevicesSchema = z.array(DeviceSchema);
const CalcForm: FC<ICalcFormProps> = ({}) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [devices, setDevices] = useState<z.infer<typeof DevicesSchema>>([]);
  const [selectedDevice, setSelectedDevice] = useState<z.infer<typeof DevicesSchema>[number] | null>(null); // State for selected device
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CalculateDevices>>({
    resolver: zodResolver(CalculateDevices),
    defaultValues: {
      id: '',
      nameDevice: '',
      count: '0',
      hoursWork: '0',
      period: periodOptions[0].label,
      kw: '10',
      kwMonth: '10',
    },
  });

  const [currentKw, setCurrentKw] = useState<number>(Number(form.getValues('kw')) || 0);

  const onSubmit = (values: z.infer<typeof CalculateDevices>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      calculate(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  useEffect(() => {
    getDevices()
      .then((devices) => {
        setDevices(devices);
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              name="nameDevice"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Назва пристрою</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        const device = devices.find((d) => d.nameDevice === value);
                        setSelectedDevice(device || null);
                      }}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Виберіть пристрій"/>
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
                  <FormMessage/>
                </FormItem>
              )}
            />
            {selectedDevice ? <>
              <FormField
                name="count"
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Кількість</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                name="hoursWork"
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Часи роботи</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                name="period"
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Період</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
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
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                name="kw"
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>кВт</FormLabel>
                    <FormControl>
                      <Slider
                        value={[Number(field.value)]}
                        step={Number(selectedDevice?.stepKw) || 1}
                        max={Number(selectedDevice?.stepKwMax) || 100}
                        onValueChange={(value) => {
                          field.onChange(String(value[0]));
                          setCurrentKw(value[0]); // Update the current kW value
                        }}
                        disabled={isPending}
                      />
                    </FormControl>
                    <div className="mt-2 text-sm text-gray-500">Current kW: {currentKw}</div>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                name="kwMonth"
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>кВт в місяць</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </> : null}
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button type="submit" className="w-full" disabled={!selectedDevice ? true : false}>
            Розрахувати
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CalcForm;
