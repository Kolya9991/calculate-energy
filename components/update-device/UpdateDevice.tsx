import { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DeviceSchema } from "@/schemas";
import { updateDevice } from "@/actions/update-device";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import {useRouter} from "next/navigation";

interface IUpdateDeviceProps {
  initialData: z.infer<typeof DeviceSchema>;
}

const UpdateDevice: FC<IUpdateDeviceProps> = ({ initialData }) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof DeviceSchema>>({
    resolver: zodResolver(DeviceSchema),
    defaultValues: initialData,
  });
  const route = useRouter()
  const onSubmit = (values: z.infer<typeof DeviceSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      updateDevice(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
          route.push('/admin')
        });
    });
  };

  return (
    <Card className='mx-auto'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>
          Редагування пристрою
        </p>
      </CardHeader>
      <CardDescription className='flex justify-center align-items-center space-y-6'>
        Оновіть інформацію про пристрій!
      </CardDescription>
      <CardContent className='space-y-4'>
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
              <FormField
                name='stepKwMin'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Мінімальний крок kW</FormLabel>
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
                name='stepKwMax'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Максимальний крок kW</FormLabel>
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
              Оновити пристрій
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateDevice;
