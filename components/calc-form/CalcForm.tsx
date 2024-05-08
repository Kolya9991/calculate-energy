import {FC, useState, useTransition} from 'react'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {CalculateDevices} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {calculateCreate} from "@/actions/calculate-create";

interface ICalcFormProps {
}

const CalcForm: FC<ICalcFormProps> = ({}) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof CalculateDevices>>({
    resolver: zodResolver(CalculateDevices),
    defaultValues: {
      id: '',
      nameDevice: '',
      count: '0',
      hoursWork: '0',
      period: '0.01',
      kw: '10',
      kwMonth: '10',
    },
  })

  const onSubmit = (values: z.infer<typeof CalculateDevices>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      calculateCreate(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        })
    })
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              name='nameDevice'
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Назва пристрою</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            <FormField
              name='count'
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Кількість</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            <FormField
              name='hoursWork'
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Часи роботи</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            <FormField
              name='period'
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Період</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            <FormField
              name='kw'
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>кВт</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            <FormField
              name='kwMonth'
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>кВт в місяць</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button type='submit' className='w-full'>
            Розрахувати
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CalcForm;
