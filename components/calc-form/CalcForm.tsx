import {FC, useState, useTransition} from 'react'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {DeviceSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {addDevice} from "@/actions/add-device";

interface ICalcFormProps {
}

const CalcForm: FC<ICalcFormProps> = ({}) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof DeviceSchema>>({
    resolver: zodResolver(DeviceSchema),
    defaultValues: {
      id: '',
      nameDevice: '',
      kwMin: '0',
      kwMax: '0',
      stepKw: '0.01',
      maxKwMonth: '10',
    },
  })

  const onSubmit = (values: z.infer<typeof DeviceSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      console.log(values)
      addDevice(values)
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
              name='kwMin'
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>кВт Мін.</FormLabel>
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
              name='kwMax'
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>кВт Макс.</FormLabel>
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
              name='stepKw'
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Шаг кВт</FormLabel>
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
              name='maxKwMonth'
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Макс кВт</FormLabel>
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
            Додати пристрій
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CalcForm;
