'use client'

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {settings} from "@/actions/settings";
import {useState, useTransition} from "react";
import {useSession} from "next-auth/react";
import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Input} from "@/components/ui/input";
import {SettingSchema} from "@/schemas";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import {UserRole} from "@prisma/client";
import {Badge} from "@/components/ui/badge";
import {Switch} from "@/components/ui/switch";

const SettingPage = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const {update} = useSession()
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    }
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    startTransition(() => {
      settings(values).then((data) => {
        if (data.error) {
          setError(data?.error)
        }
        if (data.success) {
          update();
          setSuccess(data.success);
        }
      })
        .catch((error) => setError(error.message))
    })
  }

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold'>⚙️ Налаштування</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <FormField name='name' control={form.control} render={({field}) => (
                <FormItem>
                  <FormLabel>Ім&apos;я</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='John Doe'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              {user?.isOAuth === false && <>
                  <FormField name='email' control={form.control} render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='test@gmail.com'
                          disabled={isPending}
                          type='email'
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField name='password' control={form.control} render={({field}) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='******'
                          disabled={isPending}
                          type='password'
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField name='newPassword' control={form.control} render={({field}) => (
                    <FormItem>
                      <FormLabel>Новий Пароль</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='******'
                          disabled={isPending}
                          type='password'
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
              </>}
              <FormField name='role' control={form.control} render={({field}) => (
                <FormItem>
                  <FormLabel>Роль</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a role'/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>
                        Admin
                      </SelectItem>
                      <SelectItem value={UserRole.USER}>
                        User
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              )}/>
              {user?.isOAuth === false &&
                  <FormField name='isTwoFactorEnabled' control={form.control} render={({field}) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
                      <div className='space-y-0.5'>
                        <FormLabel>2FA</FormLabel>
                        <FormDescription>
                          Опція яка демонструє, чи ввімкнено 2 факторну авторизацію
                        </FormDescription>
                      </div>
                      <FormControl>
                        {/*<Badge*/}
                        {/*  variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>{user?.isTwoFactorEnabled ? 'Є' : "Нема"}</Badge>*/}
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}/>}
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button type='submit'>
              Зберегти
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingPage;