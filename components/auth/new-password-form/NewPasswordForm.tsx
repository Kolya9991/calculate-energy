'use client'
import * as z from 'zod'
import CardWrapper from "@/components/auth/CardWrapper";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {NewPasswordSchema} from "@/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState, useTransition} from "react";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import {useSearchParams} from "next/navigation";
import {newPassword} from "@/actions/new-password";

const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    }
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper backButtonHref="/auth/login" backButtonLabel="Повернутись на сторінку авторизації"
                 headerLabel="Ввдіть новий пароль">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*******"
                      type='password'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button type="submit" className='w-full'>
            Скинути пароль
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;